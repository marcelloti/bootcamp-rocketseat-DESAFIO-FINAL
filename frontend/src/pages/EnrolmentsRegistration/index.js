import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { differenceInMonths, addMonths, format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import api from '~/services/api';
import history from '~/services/history';
import {
  Container,
  PageTitle,
  ActionDiv,
  Header,
  Content,
  EnrolmentData,
  ValidationErrors,
} from './styles';

import SelectInput from '~/components/SelectInput';
import DatePicker from '~/components/DatePicker';
import { formatPriceToBR } from '~/services/tools';

import {
  enrolmentCreateRequest,
  enrolmentUpdateRequest,
} from '~/store/modules/enrolment/actions';

const schema = Yup.object().shape({
  start_date: Yup.date()
    .typeError('Selecione a data de início')
    .required('A data de início é obrigatória'),
  plan_id: Yup.string()
    .typeError('Selecione o plano')
    .required('O plano é obrigatório')
    .min(1),
  student_id: Yup.string()
    .typeError('Selecione um aluno')
    .required('O aluno é obrigatório'),
});

export default function EnrolmentsRegistration() {
  const dispatch = useDispatch();
  const enrolmentData = useSelector(state => state.enrolment.enrolmentData);

  function calcDuration(startDate, endDate) {
    if (startDate !== null && endDate !== null) {
      return differenceInMonths(parseISO(startDate), parseISO(endDate));
    }

    return 0;
  }

  const [loadingStudent, setLoadingStudent] = useState(false);
  const [validationErrorsVisible, setValidationErrorsVisible] = useState(false);
  const [validationErrors, setValidationErrors] = useState('');
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [disableStartDate, setDisableStartDate] = useState(false);
  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);
  const [endDate, setEndDate] = useState(enrolmentData.end_date || '');
  const defaultStartDate = new Date();
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [monthPrice, setMonthPrice] = useState(enrolmentData.price || 0);
  const [duration, setDuration] = useState(
    calcDuration(startDate, endDate) * monthPrice
  );
  const [totalPrice, setTotalPrice] = useState('R$ 0,00');

  const displayValidationErrors = useCallback(async errors => {
    if (errors instanceof Array) {
      const htmlError = errors.map(errMsg => {
        return `<li>${errMsg}</li>`;
      });
      setValidationErrorsVisible(true);
      setValidationErrors(`<ul>${htmlError}</ul>`);
    }
  }, []);

  useEffect(() => {
    if (enrolmentData.id) {
      setSelectedStudent({
        id: enrolmentData.student.id,
        title: enrolmentData.student.name,
      });
      setStartDate(parseISO(enrolmentData.start_date));
      setSelectedPlan(enrolmentData.plan);
    }
  }, [enrolmentData]);

  useEffect(() => {
    setDisableStartDate(true);
  }, []);

  useEffect(() => {
    if (selectedPlan !== '') {
      setDuration(selectedPlan.duration);
      setMonthPrice(selectedPlan.price);
      setDisableStartDate(false);
    }
  }, [selectedPlan]);

  useEffect(() => {
    if (startDate !== '') {
      try {
        setEndDate(format(addMonths(startDate, duration), 'dd/MM/yyyy'));
      } catch (err) {
        displayValidationErrors(err);
      }
    }
  }, [displayValidationErrors, duration, startDate]);

  useEffect(() => {
    if (duration && monthPrice) {
      setTotalPrice(formatPriceToBR(monthPrice * duration));
    }
  }, [duration, monthPrice]);

  function voltarBtn() {
    history.goBack(-1);
  }

  function cadastrarBtn() {
    document.getElementById('submitButton').click();
  }

  function handleSubmit(newData) {
    setValidationErrorsVisible(false);
    schema
      .validate(newData)
      .then(() => {
        // Create action
        if (!enrolmentData.id) {
          dispatch(enrolmentCreateRequest(newData));
        }

        // Update action
        else {
          dispatch(
            enrolmentUpdateRequest({
              id: enrolmentData.id,
              student_id: newData.student_id,
              plan_id: newData.plan_id,
              start_date: newData.start_date,
            })
          );
        }
      })
      .catch(err => {
        displayValidationErrors(err.errors);
      });
  }

  const loadStudents = useCallback(async inputValues => {
    try {
      setLoadingStudent(true);

      const response = await api.get('students', {
        params: {
          q: inputValues,
        },
      });

      const data = response.data.map(student => ({
        id: student.id,
        title: student.name,
      }));

      setStudents(data);

      return data;
    } catch (_) {
      return toast.error('Erro ao carregar os alunos.');
    } finally {
      setLoadingStudent(false);
    }
  }, []);

  const loadPlansOnRefresh = useCallback(async () => {
    if (plans.length === 0) {
      const response = await api.get('plans');
      setPlans(response.data);
    }
  }, [plans.length]);

  loadPlansOnRefresh();

  const loadPlans = useCallback(async () => {
    try {
      setLoadingPlan(true);

      if (plans.length === 0) {
        const response = await api.get('plans');

        if (response.length !== 0) {
          setPlans(response.data);
        }
      }

      const data = await plans.map(plan => {
        return {
          id: plan.id,
          title: plan.title,
          total_price: plan.total_price,
          duration: plan.duration,
        };
      });

      return data;
    } catch (_) {
      return toast.error('Erro ao carregar os planos.');
    } finally {
      setLoadingPlan(false);
    }
  }, [plans]);

  return (
    <Container>
      <Header>
        <PageTitle>Cadastro de matrícula</PageTitle>
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
          <Form id="formEnrolment" onSubmit={handleSubmit}>
            <EnrolmentData>
              <div>
                <label>ALUNO</label>
                <SelectInput
                  name="student_id"
                  isDisabled={loadingStudent}
                  options={students}
                  placeholder="Buscar aluno"
                  noOptionsMessage={() => 'Nenhum aluno selecionado'}
                  loadOptions={loadStudents}
                  value={selectedStudent}
                  cacheOptions
                  onChange={value => {
                    setSelectedStudent(value);
                  }}
                />
              </div>
            </EnrolmentData>

            <EnrolmentData>
              <div>
                <label>PLANO</label>
                <SelectInput
                  name="plan_id"
                  isDisabled={loadingPlan}
                  options={plans}
                  placeholder="Selecionar plano"
                  noOptionsMessage={() => 'Nenhum plano selecionado'}
                  loadOptions={loadPlans}
                  value={selectedPlan}
                  cacheOptions
                  onChange={value => {
                    setSelectedPlan(value);
                  }}
                />
              </div>
              <div className="space">
                <label>DATA DE INÍCIO</label>
                <DatePicker
                  name="start_date"
                  disabled={disableStartDate}
                  onChange={setStartDate}
                  placeholder="Data de início"
                  selected={startDate}
                />
              </div>
              <div className="space">
                <label>DATA DE TÉRMINO</label>
                <Input type="text" name="end_date" value={endDate} disabled />
              </div>
              <div className="space">
                <label>VALOR FINAL</label>
                <Input
                  type="text"
                  name="totalprice"
                  disabled
                  value={totalPrice}
                />
              </div>
            </EnrolmentData>

            {/*
              Because of something you didn't find out, validation errors
              weren't showing. To solve this problem, I created this div that
              displays validation errors.
            */}
            <ValidationErrors visible={validationErrorsVisible}>
              <div id="divErrTitle">
                Erros foram encontrados ao tentar salvar:
              </div>
              {ReactHtmlParser(validationErrors)}
            </ValidationErrors>

            {/*
               I know, this button should not be here. However, I kept for
               easy form submission as it was not working to submit the form
               via javascript with the submit method (Yup validations didn't
               work with Form element of Unform)
            */}
            <button id="submitButton" type="submit">
              Salvar
            </button>
          </Form>
        </Content>
      </div>
    </Container>
  );
}
