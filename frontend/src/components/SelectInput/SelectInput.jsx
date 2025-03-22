import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import PropTypes from 'prop-types';

const SelectInput = ({ destination, placeholder, icon, data = [], onChange }) => {
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState(null);

    const filtered =
        query === ''
            ? data
            : data.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <Combobox
            value={selected}
            onChange={(value) => {
                setSelected(value);
                onChange(value.name);
            }}
            onClose={() => setQuery('')}
        >
            <div className="relative flex w-full items-center rounded-full bg-white border border-gray-300 shadow-sm transition-all focus-within:shadow-[0_0_7px_3px_theme('colors.primary-light')]">
                <label className="absolute -top-3 left-2 bg-white px-1 text-[#00000099] text-xs font-normal">
                    {destination}
                </label>
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pr-3 text-gray-500">
                    <FontAwesomeIcon icon={icon} />
                </div>
                <ComboboxInput
                    className="w-full h-[58px] rounded-full bg-white py-2 pl-12 pr-10 text-base text-gray-900 outline-none"
                    placeholder={placeholder}
                    displayValue={(item) => item?.name || ''}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                    <ChevronDownIcon className="size-4 fill-gray-500 group-data-[hover]:fill-black" />
                </ComboboxButton>
            </div>

            <ComboboxOptions
                anchor="bottom"
                transition
                className="w-[var(--input-width)] mt-2 rounded-xl bg-white p-2 shadow-[0_2px_12px_rgba(119,218,218,0.25)]"
            >
                {filtered.map((item) => (
                    <ComboboxOption
                        key={item.id}
                        value={item}
                        className="group flex cursor-default items-center gap-2 rounded-lg py-2 px-3 select-none data-[focus]:bg-primary-light"
                    >
                        <CheckIcon className="invisible size-4 fill-gray-500 group-data-[selected]:visible" />
                        <div className="text-sm text-gray-900">{item.name}, {item.city}</div>
                    </ComboboxOption>
                ))}
            </ComboboxOptions>
        </Combobox>
    );
};

SelectInput.propTypes = {
    destination: PropTypes.string,
    placeholder: PropTypes.string,
    icon: PropTypes.object,
    data: PropTypes.array,
    onChange: PropTypes.func.isRequired,
};

export default SelectInput;
