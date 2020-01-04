import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdClear } from 'react-icons/md';
import {
  ModalComponent,
  ModalBackground,
  Question,
  Answer,
  CloseModal,
} from './styles';

import {
  answerHelpOrderRequest,
  modalCloseRequest,
} from '~/store/modules/helporder/actions';

export default function ModalHelpOrder() {
  const helpOrder = useSelector(state => state.helporder.data);

  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [question, setQuestion] = useState('');
  const [helporderId, setHelporderId] = useState(0);

  useEffect(() => {
    if (helpOrder) {
      setQuestion(helpOrder.question);
      setHelporderId(helpOrder.id);
      setModalVisible(helpOrder.visible);
    }
  }, [helpOrder]);

  async function closeModal() {
    dispatch(modalCloseRequest(helpOrder));
  }

  async function answerClick() {
    const answerValue = document.getElementById('answerfield').value;
    dispatch(answerHelpOrderRequest({ helporderId, answerValue }));
    document.getElementById('answerfield').value = '';
  }

  return (
    <>
      <ModalBackground visible={modalVisible}>
        <ModalComponent visible={modalVisible}>
          <CloseModal>
            <MdClear onClick={closeModal} color="#333" size={20} />
          </CloseModal>
          <h1>PERGUNTA DO ALUNO</h1>
          <Question>{question}</Question>

          <h1>SUA RESPOSTA</h1>

          <Answer id="answerfield" />
          <button
            onClick={() => {
              answerClick();
            }}
            type="button"
          >
            Responder aluno
          </button>
        </ModalComponent>
      </ModalBackground>
    </>
  );
}
