import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProjectsActions from '~/store/ducks/projects';
import MembersActions from '~/store/ducks/members';

import Modal from '~/components/Modal/';
import Can from '~/components/Can/';

import Button from '~/styles/components/Button';

import { Container, Project } from './styles';
import Members from '~/components/Members';

class Projects extends Component {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    getProjectsRequest: PropTypes.func.isRequired,
    openProjectModal: PropTypes.func.isRequired,
    closeProjectModal: PropTypes.func.isRequired,
    createProjectRequest: PropTypes.func.isRequired,
    openMembersModal: PropTypes.func.isRequired,
    // eslint-disable-next-line react/require-default-props
    activeTeam: PropTypes.shape({
      name: PropTypes.string,
      activeTeam: PropTypes.string,
    }),
    projects: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          tile: PropTypes.string,
        })
      ),
      projectModalOpen: PropTypes.bool,
    }).isRequired,
    members: PropTypes.shape({ membersModalOpen: PropTypes.bool }).isRequired,
  };

  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    activeTeam: PropTypes.null,
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    newProject: '',
  };

  componentDidMount() {
    const { getProjectsRequest, activeTeam } = this.props;

    if (activeTeam) {
      getProjectsRequest();
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCreateProject = e => {
    e.preventDefault();

    const { createProjectRequest } = this.props;
    const { newProject } = this.state;

    createProjectRequest(newProject);
  };

  render() {
    const {
      activeTeam,
      openProjectModal,
      closeProjectModal,
      projects,
      openMembersModal,
      members,
    } = this.props;
    const { newProject } = this.state;
    if (!activeTeam) return null;

    return (
      <Container>
        <header>
          <h1>{activeTeam.name}</h1>
          <div>
            <Can checkPermission="projects_create">
              <Button onClick={openProjectModal}>+ NOVO</Button>
            </Can>

            <Button onClick={openMembersModal}>Membros</Button>
          </div>
        </header>

        {projects.data.map(project => (
          <Project key={project.id}>
            <p>{project.title}</p>
          </Project>
        ))}
        {projects.projectModalOpen && (
          <Modal>
            <h1>Criar projeto</h1>
            <form onSubmit={this.handleCreateProject}>
              <span>Nome</span>
              <input
                name="newProject"
                value={newProject}
                onChange={this.handleInputChange}
              />
              <Button size="big" type="submit">
                Salvar
              </Button>
              <Button size="small" color="gray" onClick={closeProjectModal}>
                Cancelar
              </Button>
            </form>
          </Modal>
        )}
        {members.membersModalOpen && <Members />}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  activeTeam: state.teams.active,
  members: state.members,
  projects: state.projects,
});

const mapDispathToProps = dispatch =>
  bindActionCreators({ ...ProjectsActions, ...MembersActions }, dispatch);

export default connect(mapStateToProps, mapDispathToProps)(Projects);
