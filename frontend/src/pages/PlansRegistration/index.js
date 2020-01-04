import React, { useState, useEffect } from 'react';
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
  PlanData,
} from './styles';

import {
  planCreateRequest,
  planUpdateRequest,
} from '~/store/modules/plan/actions';

const schema = Yup.object().shape({
  title: Yup.string().required('O nome é obrigatório'),
  duration: Yup.number()
    .typeError('Insira a duração')
    .required('A duração é obrigatória'),
  price: Yup.number()
    .typeError('Insira o valor')
    .required('O valor é obrigatório'),
});

export default function PlansRegistration() {
  const dispatch = useDispatch();
  const planData = useSelector(state => state.plan.planData);

  const [duration, setDuration] = useState(planData.duration || 1);
  const [monthPrice, setMonthPrice] = useState(planData.price || 1);
  const [totalPrice, setTotalPrice] = useState(duration * monthPrice);

  useEffect(() => {
    setTotalPrice(monthPrice * duration);
  }, [duration, monthPrice]);

  function voltarBtn() {
    history.goBack(-1);
  }

  function cadastrarBtn() {
    document.getElementById('submitButton').click();
  }

  function handleSubmit({ title, duration, price }) {
    // Create action
    if (planData === null || planData.id === 'undefined') {
      dispatch(planCreateRequest({ title, duration, price }));
    }

    // Update action
    else {
      const { id } = planData;
      dispatch(planUpdateRequest({ id, title, duration, price }));
    }
  }

  return (
    <Container>
      <Header>
        <PageTitle>Cadastro de plano</PageTitle>
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
            id="formPlan"
            initialData={planData}
            schema={schema}
            onSubmit={handleSubmit}
          >
            <PlanData>
              <div>
                <label>TÍTULO DO PLANO</label>
                <Input type="text" name="title" placeholder="PLANO 1" />
              </div>
            </PlanData>

            <PlanData>
              <div>
                <label>DURAÇÃO</label>
                <Input
                  type="text"
                  name="duration"
                  placeholder="1"
                  onChange={e => setDuration(e.target.value)}
                />
              </div>
              <div>
                <label>PREÇO MENSAL</label>
                <Input
                  type="text"
                  name="price"
                  onChange={e => setMonthPrice(e.target.value)}
                />
              </div>
              <div>
                <label>PREÇO TOTAL</label>
                <Input
                  type="text"
                  name="totalprice"
                  disabled
                  value={totalPrice}
                />
              </div>
            </PlanData>

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
