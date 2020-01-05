import React, { useState, useCallback } from 'react';

import { MdAdd } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { planCreateOpen, planUpdateOpen } from '~/store/modules/plan/actions';
import history from '~/services/history';
import {
  Container,
  PageTitle,
  ActionDiv,
  Header,
  Content,
  Table,
} from './styles';
import { formatPriceToBR } from '~/services/tools';

export default function Plans() {
  const dispatch = useDispatch();
  const [plans, setPlans] = React.useState([]);

  async function cadastrarBtn() {
    dispatch(planCreateOpen());
    history.push('/plansregistration');
  }

  function getDurationText(duration) {
    if (duration > 1) {
      return `${duration} meses`;
    }
    return `${duration} mês`;
  }

  const loadPlans = useCallback(async () => {
    try {
      const response = await api.get('plans');
      const plansFormatted = response.data.map(plan => {
        return {
          ...plan,
          priceFormatted: formatPriceToBR(plan.price),
          durationText: getDurationText(plan.duration),
        };
      });
      return setPlans(plansFormatted);
    } catch (_) {
      return toast.error('Erro ao carregar os planos.');
    }
  }, []);

  useState(() => {
    loadPlans();
  }, []);

  async function editarBtn({ id, title, duration, price }) {
    dispatch(planUpdateOpen({ id, title, duration, price }));
    history.push(`/planupdate/${id}`);
  }

  async function apagarBtn(plan) {
    // eslint-disable-next-line no-alert
    const response = window.confirm(
      `Deseja realmente apagar o registro ${plan.title} ?`
    );
    if (response === true) {
      await api.delete(`plans/${plan.id}`);
      loadPlans();
    }
  }

  return (
    <Container>
      <Header>
        <PageTitle>Gerenciando planos</PageTitle>
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
                <th>TÍTULO</th>
                <th className="centerColumn">DURAÇÃO</th>
                <th className="centerColumn">VALOR p/ MÊS</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4">&nbsp;</td>
              </tr>
              {plans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.title}</td>
                  <td className="centerColumn">{plan.durationText}</td>
                  <td className="centerColumn">{plan.priceFormatted}</td>
                  <td>
                    <button
                      type="button"
                      className="editarLink"
                      onClick={() => {
                        editarBtn(plan);
                      }}
                    >
                      editar
                    </button>
                    <button
                      type="button"
                      className="apagarLink"
                      onClick={() => {
                        apagarBtn(plan);
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
