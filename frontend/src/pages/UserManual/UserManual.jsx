import PropTypes from 'prop-types';
import TableOfContents from '../../components/TableOfContents';
import userManual from '../../data/mocks/UserManual/userManual.json';
const userManualData = userManual;

// Component displays each part of the tutorial
const UserManualSection = ({ id, title, sections }) => {
    return (
        <div id={`section-${id}`} className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
                {id}. {title}
            </h2>
            {sections.map((section) => (
                <div key={section.id} className="mt-4">
                    {section.subtitle && (
                        <h3 className="text-lg font-medium text-gray-700">
                            {section.id}. {section.subtitle}
                        </h3>
                    )}
                    <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                        {section.content.map((step, stepIndex) => (
                            <li key={stepIndex}>{step}</li>
                        ))}
                    </ul>
                    {section.note && (
                        <p className="mt-2 text-red-500 text-sm italic">
                            <strong>Lưu ý:</strong> {section.note}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};
//  Declare PropTypes to check input data
UserManualSection.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            subtitle: PropTypes.string,
            content: PropTypes.arrayOf(PropTypes.string).isRequired,
            note: PropTypes.string,
        }),
    ).isRequired,
};

// Main component displays the user manual page
const UserManual = () => {
    return (
        <div className="min-h-screen p-5 bg-gray-50">
            <div className="max-w-8xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Hướng dẫn sử dụng website TourX</h1>
                <img className="mb-4" src="/src/assets/images/utils/heading-border.webp" alt="spacing" />
                <TableOfContents items={userManualData} />
                {userManualData.map((manual) => (
                    <UserManualSection key={manual.id} id={manual.id} title={manual.title} sections={manual.sections} />
                ))}
            </div>
        </div>
    );
};

export default UserManual;
