import React from 'react';
import PropTypes from 'prop-types';
import { Popup, Rating, Image} from 'semantic-ui-react'
/**
 * @usage 
 * <TimelineItem time={time} text={text} />
 */
// const PopupExampleHtml = () => (
//   <Popup trigger={TimelineItem}>
//     <Popup.Header>User Rating</Popup.Header>
//     <Popup.Content>
//       <Rating icon='star' defaultRating={3} maxRating={4} />
//       <Image src='https://i.imgur.com/Zl5AgOH.jpg' />
//       <p>
//       Two sisters move to the country with their father in order to be closer to their
//         hospitalized mother, and discover the surrounding trees are inhabited by magical spirits.
//       </p>
//     </Popup.Content>
//   </Popup>
// )

function TimelineItem({time, text}) {
  return (
    <li>
      <i className="fa" />
      <div className="time-line-item">
        <span className="time">
          <i className="fa fa-clock-o" /> {time}
        </span>
        <div className="time-line-header">
          <Popup
            trigger={<span>{text}</span>}
            content={
              <React.Fragment>
                <Popup.Header>User Rating</Popup.Header>
                <Popup.Content>
                  <Rating icon='star' defaultRating={3} maxRating={4} />
                  <Image src='https://i.imgur.com/Zl5AgOH.jpg' />
                  <p>
                  Two sisters move to the country with their father in order to be closer to their
                    hospitalized mother, and discover the surrounding trees are inhabited by magical spirits.
                  </p>
                </Popup.Content>
              </React.Fragment>
            }
            on='click'
            position='top right'
          />
        </div>
      </div>
    </li>
  );
}

TimelineItem.defaultProps = {};

TimelineItem.propTypes = {
  time: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default TimelineItem;
