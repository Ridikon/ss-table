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
    this.computeProgressColWidth()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.numberOfMonth === this.props.numberOfMonth) {
      return;
    }

    this.computeProgressColWidth()
  }

  computeProgressColWidth() {
    const { numberOfMonth, getProgressColWidth } = this.props;
    const node = this.progressRef.current;

    const progressColWidth = node.clientWidth - CONST_LAST_COL_WIDTH;
    const oneDayWidth = progressColWidth / this.progressService.getDays(numberOfMonth);

    getProgressColWidth(progressColWidth);

    this.setState({
      progressColWidth,
      todayPosition: oneDayWidth * this.progressService.getPositionDay(new Date())
    });
  }

  /**
   * Render client info once
   * @param user
   * @param index
   * @returns {null|*}
   */
  static renderClientInfo(user, index) {
    const { img, name, projects } = user;

    if (!index) {
      return (
        <td rowSpan={projects.length} className="user">
          <div>
            <img src={img} alt="user"/>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#">{name}</a>
          </div>
        </td>
      )
    }

    return null;
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

  render() {
    const { numberOfMonth, user } = this.props;
    const { progressColWidth, todayPosition } = this.state;

    return _.map(user.projects, (project, i) => {
      const { id, status, name, start, end, progress } = project;

      const badgeClasses = ['badge', 'badge-pill', TableRow.setClass(status, 'badge')];

      return (
        <tr key={id} className="user-row">

          {TableRow.renderClientInfo(user, i)}

          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <td><a href="#" className="pl-3">{name}</a></td>
          <td><span className={badgeClasses.join(' ')}>{status}</span></td>
          <td
            className="progress-col"
            colSpan={numberOfMonth + 1}
            ref={this.progressRef}
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
    })
  }
};
