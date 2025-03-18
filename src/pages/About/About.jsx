import zestif_logo from '../../assets/images/About/zestif-logo.svg'
import about from '../../data/mocks/About/about.json'

about[3].sections[0].content[1].card_set[1].logo = zestif_logo

const aboutData = about

const Card = ({ logo, link, role, context, title, sub_title }) => {
    return (
        <div className='px-4 py-6 border border-gray-300 rounded-2xl shadow-sm flex flex-col justify-between gap-3'>
            {
                title ? "" :
                    <div className='flex justify-between items-center'>
                        {logo ?
                            logo.match(/^icon\/\/.*$/) ?
                                <div className='bg-cyan-500 size-[56px] flex items-center justify-center rounded-full'>
                                    <img src={logo.slice(6)} alt="Lỗi hình ảnh" className='max-h-[32px]' />
                                </div> :
                                <img src={logo} alt="Lỗi hình ảnh" className='max-h-[32px]' />
                            : ""
                        }
                        {
                            link ?
                                <a href={link} className='text-cyan-800 font-medium hover:text-cyan-300'>Website</a> :
                                ""
                        }
                    </div>
            }
            {
                title ?
                    <div>
                        <div className='font-bold text-lg text-black'>{title}</div>
                        <div className='font-[500] text-gray-600 '>{sub_title}</div>
                    </div> :
                    <div className='font-bold'>
                        {role ? role : ""}
                    </div>
            }
            <div className='text-gray-600'>
                {context ? Array.isArray(context) ? context.map((i, index) => i.match(/^br\/\/.*$/)? <br key={index} /> : <div key={index}>{i}</div>) : context : ""}
            </div>
        </div>
    )
}

const TermsSection = ({ id, title, sections }) => {
    return (
        <div id={`section-${id}`} className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
                {id}. {title}
            </h2>
            {sections.map((section) => (
                <div key={section.id} className="mt-4">
                    {section.subtitle && (
                        <h3 className="text-lg font-medium text-gray-700">
                            {section.id}. {section.subtitle}:
                        </h3>
                    )}
                    <div className="text-gray-600 mt-2 space-y-2">
                        {section.content.map((step, stepIndex) => {
                            return (
                                <div key={`${section.id}-${stepIndex}`}>
                                    {
                                        step.list ?
                                            <div key={stepIndex}>
                                                {step.list.map((subStep, listIndex) => (
                                                    subStep.match(/^li\/\/.*$/) ?
                                                        <li key={listIndex}>{subStep.slice(4)}</li> :
                                                        <div key={listIndex}>{subStep}</div>
                                                ))}
                                            </div> :
                                            step.card_grid ?
                                                <div className={step.card_grid}>
                                                    {
                                                        step.card_set.map((i, index) =>
                                                            <Card logo={i.logo} link={i.link} role={i.role} context={i.context} title={i.title} sub_title={i.sub_title} key={index} />)
                                                    }
                                                </div> :
                                                <div key={stepIndex}>{step}</div>
                                    }
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

const About = () => {
    return (
        <div className="min-h-screen p-5 bg-gray-50">
            <div className="max-w-8xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Điều khoản và điều kiện</h1>
                <img className="mb-4" src="/src/assets/images/utils/heading-border.webp" alt="Error" />
                {aboutData.map((about) => (
                    <TermsSection key={about.id} id={about.id} title={about.title} sections={about.sections} />
                ))}
            </div>
        </div>
    );
};

export default About;
