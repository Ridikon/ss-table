import React from 'react';

import ProgressService from '../../services/progress-service';

import './project-progress.scss'

const ProjectProgress = ({ start, end, progress, numberOfMonth, bgClass, textClass, colWidth }) => {
  const clsBg = ['progress-line-bg'];
  const clsText = ['progress-line-text'];
  const progressService = new ProgressService();

  if (bgClass) {
    clsBg.push(bgClass)
  }

  if (textClass) {
    clsText.push(textClass)
  }

  function setStyles() {
    const styles = {};
    const oneDayWidth = progressService.getOneDayWidth(colWidth, numberOfMonth);
    const startPosition = progressService.getPositionDay(start);
    const endPosition = progressService.getPositionDay(end);

    styles.left = (oneDayWidth * startPosition) + 'px';
    styles.width = ((oneDayWidth * endPosition) - (oneDayWidth * startPosition)) + 'px';

    return styles;
  }

  return (
    <div className="progress-line">
			<span
        className="progress-line-wrapper"
        style={setStyles()}
      >
				<span className={clsBg.join(' ')}/>
				<span className={clsText.join(' ')}>
					{progress ? `${progress}%` : ''}
				</span>
			</span>
    </div>
  );
};

export default ProjectProgress;
