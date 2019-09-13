import React, { Component } from 'react';

import _ from 'lodash';

import ProjectProgress from '../../project-progress';
import ProgressService from '../../../services/progress-service';
import { CONST_LAST_COL_WIDTH } from '../../../constants'

import './table-row.scss'

export default class TableRow extends Component {
  progressService = new ProgressService();

  state = {
    progressColWidth: 0,
    todayPosition: 0
  };

  constructor(props) {
    super(props);
    this.progressRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeEvent);

    this.computeProgressColWidth();
    this.computeTodayPosition()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.numberOfMonth === this.props.numberOfMonth) {
      return;
    }

    this.computeProgressColWidth();
    this.computeTodayPosition()
  }

  resizeEvent = () => {
    setTimeout(() => {
      this.computeProgressColWidth();
      this.computeTodayPosition()
    }, 100)
  };

  computeProgressColWidth() {
    const { setProgressColWidth } = this.props;

    setProgressColWidth(this.getProgressColWidth());

    this.setState({
      progressColWidth: this.getProgressColWidth()
    });
  }

  computeTodayPosition() {
    const { numberOfMonth } = this.props;

    this.setState({
      todayPosition: this.progressService.getTodayPosition(this.getProgressColWidth(), numberOfMonth, new Date())
    });
  }

  getProgressColWidth() {
    if (this.progressRef.current) {
      const node = this.progressRef.current;
      return node.clientWidth - CONST_LAST_COL_WIDTH
    }

    return null;
  }

  /**
   * Render client info once
   * @param user
   * @returns {null|*}
   */
  static renderClientInfo(user) {
    const { img, name, projects } = user;

    return (
      <td rowSpan={projects.length} className="user">
        <div>
          <img src={img} alt="user"/>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#">{name}</a>
        </div>
      </td>
    )
  };

  static setClass(status, type) {
    switch (status) {
      case 'billable':
        return `${type}-success`;
      case 'vacation':
        return `${type}-secondary`;
      case 'internal':
        return `${type}-primary`;
      case 'potential':
        return `${type}-warning`;
      default:
        return '';
    }
  };

  renderProject = (project, i) => {
    const { numberOfMonth, user } = this.props;
    const { progressColWidth, todayPosition } = this.state;

    const { id, status, name, start, end, progress } = project;
    const badgeClasses = ['badge', 'badge-pill', TableRow.setClass(status, 'badge')];

    return (
      <tr key={id} className="user-row">

        {!i ? TableRow.renderClientInfo(user) : null}

        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <td><a href="#" className="pl-3">{name}</a></td>
        <td><span className={badgeClasses.join(' ')}>{status}</span></td>
        <td
          className="progress-col"
          colSpan={numberOfMonth + 1}
          ref={!i ? this.progressRef : null}
        >
          <ProjectProgress
            bgClass={TableRow.setClass(status, 'bg')}
            textClass={TableRow.setClass(status, 'text')}
            colWidth={progressColWidth}
            numberOfMonth={numberOfMonth}
            start={start}
            end={end}
            progress={progress}
          />
          <span
            style={{ left: `${todayPosition}px` }}
            className="bg-primary vertical-line"
          />
        </td>
      </tr>
    )
  };

  render() {
    return _.map(this.props.user.projects, this.renderProject)
  }
};
