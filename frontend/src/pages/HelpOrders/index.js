import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import api from '~/services/api';
import {
  Container,
  PageTitle,
  ActionDiv,
  Header,
  Content,
  Table,
} from './styles';
import ModalHelpOrder from '~/components/ModalHelpOrder';
import { modalOpenRequest } from '~/store/modules/helporder/actions';

export default function HelpOrders() {
  const dispatch = useDispatch();

  const [helporders, setHelporders] = React.useState([]);
  const helpOrderListen = useSelector(state => state.helporder);

  async function loadHelporders() {
    const response = await api.get('students/help-orders');
    return response;
  }

  async function openModal(helporder) {
    dispatch(modalOpenRequest(helporder));
  }

  useState(() => {
    loadHelporders().then(result => {
      setHelporders(result.data);
    });
  }, []);

  useEffect(() => {
    loadHelporders().then(result => {
      setHelporders(result.data);
    });
  }, [helpOrderListen]);

  return (
    <Container>
      <Header>
        <PageTitle>Pedidos de auxílio</PageTitle>
        <ActionDiv>
          <button type="button">
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
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4">&nbsp;</td>
              </tr>
              {helporders.map(helporder => (
                <tr key={helporder.id}>
                  <td>{helporder.student.name}</td>
                  <td>
                    <button
                      type="button"
                      className="openModalBtn"
                      onClick={() => {
                        openModal(helporder);
                      }}
                    >
                      responder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ModalHelpOrder />
        </Content>
      </div>
    </Container>
  );
}
