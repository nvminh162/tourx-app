import { useState } from 'react';
import PropTypes from 'prop-types';

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { CheckIcon } from '@heroicons/react/20/solid';

const SelectMenus = ({ data }) => {
    const [selected, setSelected] = useState(data[0]);
    return (
        <Listbox value={selected} onChange={setSelected}>
            <div className="relative border border-gray-300 rounded-full focus-within:shadow-[0_0_7px_3px_theme('colors.primary-light')]">
                <ListboxButton className="flex items-center rounded-full bg-white pl-5 shadow-sm transition-all w-full py-3 px-4">
                    <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                        {selected.image && <img alt="" src={selected.image} className="size-5 shrink-0 rounded-full" />}
                        <span className="block truncate capitalize">{selected.name}</span>
                    </span>
                    <ChevronDownIcon
                        aria-hidden="true"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 size-5"
                    />
                </ListboxButton>
                <ListboxOptions
                    transition
                    className="overflow-auto absolute z-10 mt-1 max-h-56 w-full rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                >
                    {data.map((place) => (
                        <ListboxOption
                            key={place.id}
                            value={place}
                            className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-primary-light data-focus:text-black data-focus:outline-hidden"
                        >
                            <div className="flex items-center">
                                {place.image && (
                                    <img alt="" src={place.image} className="size-5 shrink-0 rounded-full" />
                                )}
                                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold capitalize">
                                    {place.name}
                                </span>
                            </div>

                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                                <CheckIcon aria-hidden="true" className="size-5" />
                            </span>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    );
};

SelectMenus.propTypes = {
    data: PropTypes.array,
}

export default SelectMenus;
