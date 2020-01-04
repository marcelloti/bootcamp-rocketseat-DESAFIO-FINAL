import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import history from '~/services/history';
import {
  studentCreateOpen,
  studentUpdateOpen,
} from '~/store/modules/student/actions';

import api from '~/services/api';
import {
  Container,
  PageTitle,
  ActionDiv,
  Header,
  Content,
  Table,
} from './styles';

export default function Students() {
  const dispatch = useDispatch();

  async function loadStudents() {
    const response = await api.get('students');
    return response;
  }

  const [filteredStudents, setfilteredStudents] = React.useState([]);
  const [students, setStudents] = React.useState([]);

  useState(() => {
    loadStudents().then(result => {
      setStudents(result.data);
      setfilteredStudents(result.data);
    });
  }, []);

  let searchTerm = '';
  let resultsToReturn = '';
  const handleChange = e => {
    searchTerm = e.target.value;

    if (`${searchTerm}` !== '') {
      resultsToReturn = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      resultsToReturn = students;
    }
    setfilteredStudents(resultsToReturn);
  };

  async function cadastrarBtn() {
    dispatch(studentCreateOpen());
    history.push('/studentsregistration');
  }

  async function editarBtn({ id, name, email, age, weight, height }) {
    dispatch(studentUpdateOpen({ id, name, email, age, weight, height }));
    history.push(`/studentupdate/${id}`);
  }

  async function apagarBtn(student) {
    const response = window.confirm(
      `Deseja realmente apagar o registro ${student.name} ?`
    );
    if (response === true) {
      await api.delete(`students/${student.id}`);
      loadStudents().then(result => {
        setStudents(result.data);
        setfilteredStudents(result.data);
      });
    }
  }

  return (
    <Container>
      <Header>
        <PageTitle>Gerenciando alunos</PageTitle>
        <ActionDiv>
          <button onClick={() => cadastrarBtn()} type="button">
            <MdAdd color="#fff" size={20} />
            CADASTRAR
          </button>
          <input placeholder="Buscar aluno" onChange={handleChange} />
        </ActionDiv>
      </Header>
      <div>
        <Content>
          <Table>
            <thead>
              <tr>
                <th>NOME</th>
                <th>EMAIL</th>
                <th className="centerColumn">IDADE</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4">&nbsp;</td>
              </tr>
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td className="centerColumn">{student.age}</td>
                  <td>
                    <button
                      type="button"
                      className="editarLink"
                      onClick={() => {
                        editarBtn(student);
                      }}
                    >
                      editar
                    </button>
                    <button
                      type="button"
                      className="apagarLink"
                      onClick={() => {
                        apagarBtn(student);
                      }}
                    >
                      apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Content>
      </div>
    </Container>
  );
}
