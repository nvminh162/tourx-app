import PropTypes from 'prop-types';

const TableOfContents = ({ items }) => {
    const handleScroll = (id) => {
        const section = document.getElementById(`section-${id}`);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800">Mục lục</h2>
            <ul className="text-gray-600 mt-2 space-y-2">
                {items.map((item) => (
                    <li key={item.id}>
                        <button
                            onClick={() => handleScroll(item.id)}
                            role="button"
                            aria-label={`Đi đến ${item.title}`}
                            className="text-blue-600 hover:underline cursor-pointer active:bg-gray-200 px-1 rounded transition"
                            tabIndex="0"
                        >
                            {item.id}. {item.title}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

TableOfContents.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default TableOfContents;
