import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import history from '~/services/history';
import {
  Container,
  PageTitle,
  ActionDiv,
  Header,
  Content,
  StudentData,
} from './styles';

import {
  studentCreateRequest,
  studentUpdateRequest,
} from '~/store/modules/student/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  age: Yup.number()
    .typeError('Insira a idade do aluno')
    .required('A idade é obrigatória'),
  weight: Yup.number()
    .typeError('Insira o peso do aluno')
    .required('O peso é obrigatório'),
  height: Yup.number()
    .typeError('Insira a altura do aluno')
    .required('A altura é obrigatória'),
});

export default function StudentsRegistration() {
  const dispatch = useDispatch();
  const studentData = useSelector(state => state.student.studentData);

  const [pageTitle, setPageTitle] = React.useState('Edição de aluno');

  const loadTitle = useCallback(async () => {
    if (studentData === null || typeof studentData.id === 'undefined') {
      setPageTitle('Cadastro de aluno');
    }
  }, [studentData]);

  useState(() => {
    loadTitle();
  }, []);

  function voltarBtn() {
    history.goBack(-1);
  }

  function cadastrarBtn() {
    document.getElementById('submitButton').click();
  }

  function handleSubmit({ name, email, age, weight, height }) {
    // Create action
    if (studentData === null || typeof studentData.id === 'undefined') {
      dispatch(studentCreateRequest({ name, email, age, weight, height }));
    }

    // Update action
    else {
      const { id } = studentData;
      dispatch(studentUpdateRequest({ id, name, email, age, weight, height }));
    }
  }

  return (
    <Container>
      <Header>
        <PageTitle>{pageTitle}</PageTitle>
        <ActionDiv>
          <button
            className="voltarBtn"
            onClick={() => voltarBtn()}
            type="button"
          >
            <MdKeyboardArrowLeft color="#fff" size={20} />
            VOLTAR
          </button>
          <button
            className="cadastrarBtn"
            onClick={() => cadastrarBtn()}
            type="button"
          >
            <MdDone color="#fff" size={20} />
            SALVAR
          </button>
        </ActionDiv>
      </Header>
      <div>
        <Content>
          <Form
            id="formStudent"
            initialData={studentData}
            schema={schema}
            onSubmit={handleSubmit}
          >
            <StudentData>
              <div>
                <label>NOME COMPLETO</label>
                <Input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  maxLength={80}
                />
                <label>ENDEREÇO DE E-MAIL</label>
                <Input
                  type="mail"
                  name="email"
                  maxLength={80}
                  placeholder="exemplo@email.com"
                />
              </div>
            </StudentData>

            <StudentData>
              <div>
                <label>IDADE</label>
                <Input type="text" name="age" maxLength={3} />
              </div>

              <div>
                <label>PESO (em kg)</label>
                <Input type="text" name="weight" maxLength={6} />
              </div>

              <div>
                <label>ALTURA</label>
                <Input type="text" name="height" maxLength={4} />
              </div>
            </StudentData>

            {/* I know, this should not be here. However, I kept it for easy
            submission of the form  */}
            <button id="submitButton" type="submit">
              Salvar
            </button>
          </Form>
        </Content>
      </div>
    </Container>
  );
}
