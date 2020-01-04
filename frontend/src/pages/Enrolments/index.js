import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import history from '~/services/history';
import api from '~/services/api';
import {
  Container,
  PageTitle,
  ActionDiv,
  Header,
  Content,
  Table,
} from './styles';

import {
  enrolmentCreateOpen,
  enrolmentUpdateOpen,
} from '~/store/modules/enrolment/actions';

export default function Enrolments() {
  const dispatch = useDispatch();

  async function loadEnrolments() {
    let response = await api.get('enrolments');

    response = response.data.map(enrolment => {
      const retorno = {
        ...enrolment,
        start_date_formatted: format(
          parseISO(enrolment.start_date),
          "d 'de' MMMM 'de' Y",
          {
            locale: pt,
          }
        ),
        end_date_formatted: format(
          parseISO(enrolment.end_date),
          "d 'de' MMMM 'de' Y",
          {
            locale: pt,
          }
        ),
      };

      return retorno;
    });

    return response;
  }

  const [enrolments, setEnrolments] = React.useState([]);

  useState(() => {
    loadEnrolments().then(result => {
      setEnrolments(result);
    });
  }, []);

  async function cadastrarBtn() {
    dispatch(enrolmentCreateOpen());
    history.push('/enrolmentsregistration');
  }

  async function editarBtn({ id, student, plan, start_date, end_date, price }) {
    const sendObj = {
      id,
      student,
      plan,
      start_date,
      end_date,
      totalPrice: price,
    };
    dispatch(enrolmentUpdateOpen(sendObj));
    history.push(`/enrolmentsregistration/${id}`);
  }

  async function apagarBtn(enrolment) {
    const response = window.confirm(
      `Deseja realmente apagar o registro de ID ${enrolment.id} ?`
    );
    if (response === true) {
      await api.delete(`enrolments/${enrolment.id}`);
      loadEnrolments().then(result => {
        setEnrolments(result);
      });
    }
  }

  return (
    <Container>
      <Header>
        <PageTitle>Gerenciando matrículas</PageTitle>
        <ActionDiv>
          <button onClick={() => cadastrarBtn()} type="button">
            <MdAdd color="#fff" size={20} />
            CADASTRAR
          </button>
        </ActionDiv>
      </Header>
      <div>
        <Content>
          <Table>
            <thead>
              <tr>
                <th>ALUNO</th>
                <th className="centerColumn">PLANO</th>
                <th className="centerColumn">INÍCIO</th>
                <th className="centerColumn">TÉRMINO</th>
                <th className="centerColumn">ATIVA</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4">&nbsp;</td>
              </tr>
              {enrolments.map(enrolment => (
                <tr key={enrolment.id}>
                  <td>{enrolment.student.name}</td>
                  <td className="centerColumn">{enrolment.plan.title}</td>
                  <td className="centerColumn">
                    {enrolment.start_date_formatted}
                  </td>
                  <td className="centerColumn">
                    {enrolment.end_date_formatted}
                  </td>
                  <td className="centerColumn">
                    {enrolment.active ? (
                      <MdCheckCircle className="active" size={20} />
                    ) : (
                      <MdCheckCircle className="inactive" size={20} />
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="editarLink"
                      onClick={() => {
                        editarBtn(enrolment);
                      }}
                    >
                      editar
                    </button>
                    <button
                      type="button"
                      className="apagarLink"
                      onClick={() => {
                        apagarBtn(enrolment);
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
