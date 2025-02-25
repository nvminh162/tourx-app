import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import imgUtils from '~/assets/images/utils';
import Button from '~/components/Button';

const Feedback = ({ data }) => {
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const currentFeedback = data[currentUserIndex];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentUserIndex(prevIndex => (prevIndex + 1) % data.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [data.length]);

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-8">
                <img className="w-8 h-8" src={imgUtils.quote} alt="spacing" />
                <div className="font-medium">
                    <>
                        {currentFeedback.service && (
                            <h3 className="font-bold text-xl text-gray-900">{currentFeedback.service}</h3>
                        )}
                    </>
                    <div className="mt-2 mb-6">
                        {currentFeedback.content?.map((line, index) => (
                            <p key={index} className="text-[18px] text-gray-600">
                                {line}
                            </p>
                        ))}
                    </div>
                    <>
                        {currentFeedback.author?.name && (
                            <p className="uppercase font-bold text-16px">{currentFeedback.author.name} -</p>
                        )}
                    </>
                </div>
            </div>
            <div className="flex gap-5 flex-wrap">
                {data.map((item, index) => (
                    <Button
                        rounded
                        key={index}
                        className="py-2 px-4 shadow-xl"
                        onClick={() => setCurrentUserIndex(index)}
                    >
                        {item.author.name}
                    </Button>
                ))}
            </div>
        </>
    );
};

Feedback.propTypes = {
    data: PropTypes.array,
};

export default Feedback;
