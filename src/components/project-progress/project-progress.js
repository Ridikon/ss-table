import React from 'react';

import ProgressService from '../../services/progress-service';

import './project-progress.scss'

const { getOneDayWidth, getPositionDay } = new ProgressService();

const ProjectProgress = ({ start, end, progress, numberOfMonth, bgClass, textClass, colWidth }) => {
  const clsBg = ['progress-line-bg'];
  const clsText = ['progress-line-text'];
  const oneDayWidth = getOneDayWidth(colWidth, numberOfMonth);
  const startPosition = getPositionDay(start);
  const endPosition = getPositionDay(end);

  if (bgClass) {
    clsBg.push(bgClass)
  }

  if (textClass) {
    clsText.push(textClass)
  }

  function setStyles() {
    const styles = {};

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
					{progress && `${progress}%`}
				</span>
			</span>
    </div>
  );
};

export default ProjectProgress;
