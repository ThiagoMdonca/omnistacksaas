import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '~/services/api';
import MembersActions from '../ducks/members';

export function* getMembers() {
  const response = yield call(api.get, 'members');

  yield put(MembersActions.getMembersSuccess(response.data));
}

export function* updateMember({ id, roles }) {
  try {
    yield call(api.put, `members/${id}`, { roles: roles.map(role => role.id) });
    yield put(
      toastrActions.add({
        type: 'success',
        tittle: 'Membro atualizado',
        message: 'Membro foi atualizado com success',
      })
    );
  } catch (err) {
    yield put(
      toastrActions.add({
        type: 'error',
        tittle: 'Erro na operação',
        message: 'Ouve um erro tente novamente',
      })
    );
  }
}

export function* inviteMember({ email }) {
  try {
    yield call(api.post, 'invites', { invites: [email] });
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Convite Enviado',
        message: 'Enviamos um convite ao usuário Para participar do time.',
      })
    );
  } catch (err) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Erro na operação',
        message: 'Ouve um erro tente novamente',
      })
    );
  }
}
