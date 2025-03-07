import { useMemo } from 'react';
import PropTypes from 'prop-types';

//Trả về văn bản có chứa <a> chứa email
const EmailLinkify = ({text}) => {
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})/g;

  return useMemo(() => {
    return text.split(emailRegex).map((part, index) => {
      if (emailRegex.test(part)) {
        // Nếu là email, chuyển thành link mailto
        return (
          <a key={index} href={`mailto:${part}`} style={{ color: 'blue' }}>
            {part}
          </a>
        );
      }
      return part;
    });
  }, [text]);
};

EmailLinkify.prototype = {
  text: PropTypes.string.isRequired,
}

export default EmailLinkify;