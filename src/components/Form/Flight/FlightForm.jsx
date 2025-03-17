import { faPlaneArrival, faPlaneDeparture, faUser } from '@fortawesome/free-solid-svg-icons';
import SelectInput from '../../../components/SelectInput/SelectInput';
import flightJson from '../../../data/mocks/Flight/flight.json'

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../components/Button';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';

import PropTypes from 'prop-types';

const fields = ["Người lớn", "Trẻ em", "Em bé"];

const FlightForm = ({ className }) => {
    const [departure, setDeparture] = useState(dayjs());
    const [arrival, setArrival] = useState(dayjs());

    const [values, setValues] = useState({ adults: 0, children: 0, infants: 0 });
    const handleChange = (event, field) => {
        let newValue = Math.max(0, Math.min(50, Number(event.target.value) || 0));
        setValues((prev) => ({ ...prev, [field]: newValue }));
    };

    const [isRoundTrip, setIsRoundTrip] = useState(false);
    const handleTripTypeChange = (event) => {
        setIsRoundTrip(event.target.value === "roundTrip"); // Set to true if roundTrip, false if oneWay
    };

    return (
        <div className={`py-10 px-6 bg-white items-center shadow-md border border-gray-300 rounded-4xl lg:space-y-10 space-y-0 ${className}`}>
            <div className="text-center space-y-3 text-gray-900">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Mở cánh cửa khám phá cùng TouX</h2>
                <p className="text-[18px] font-light">TouX - Đặt chân lên đỉnh mây với một bước nhảy</p>
            </div>
            <div className='space-y-3'>
                <div className='flex justify-between items-center space-x-3'>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            value={isRoundTrip ? "roundTrip" : "oneWay"}
                            onChange={handleTripTypeChange}
                            row
                        >
                            <FormControlLabel value="oneWay" control={<Radio />} label="Một chiều" sx={{ "& .MuiFormControlLabel-label": { fontSize: "14px" } }} />
                            <FormControlLabel value="roundTrip" control={<Radio />} label="Khứ hồi" sx={{ "& .MuiFormControlLabel-label": { fontSize: "14px" } }} />
                        </RadioGroup>
                    </FormControl>
                    <FormGroup row>
                        <FormControlLabel control={<Checkbox />} label="Vé rẻ nhất tháng" sx={{ "& .MuiFormControlLabel-label": { fontSize: "14px" } }} />
                    </FormGroup>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Item 1 => Options */}
                    <SelectInput
                        destination="Điểm đi"
                        placeholder="Vui lòng nhập điểm đi"
                        icon={faPlaneDeparture}
                        data={flightJson}
                    />
                    {/* Item 2 => Options */}
                    <SelectInput
                        destination="Điểm đến"
                        placeholder="Vui lòng nhập điểm đến"
                        icon={faPlaneArrival}
                        data={flightJson}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']} className="w-full">
                            <DatePicker
                                label="Ngày đi"
                                value={departure}
                                onChange={(newValue) => setDeparture(newValue)}
                                className="w-full"
                                minDate={dayjs()}
                                format="DD/MM/YYYY"
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    {isRoundTrip && (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']} className="w-full">
                                <DatePicker
                                    label="Ngày về"
                                    value={arrival}
                                    onChange={(newValue) => setArrival(newValue)}
                                    className="w-full"
                                    minDate={departure} // Ensure return date is after departure date
                                    format="DD/MM/YYYY"
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    )}
                </div>
                <div className="grid grid-cols-3 lg:grid-cols-4 gap-5">
                    {fields.map((label, index) => (
                        <TextField
                            key={label}
                            label={label}
                            type="number"
                            value={Object.values(values)[index]}
                            onChange={(e) => handleChange(e, Object.keys(values)[index])}
                            sx={{ m: 1, width: "100%" }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FontAwesomeIcon icon={faUser} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    ))}
                    <div className="col-span-full lg:col-span-1 place-self-center w-full">
                        <Button primary rounded className="h-[58px] w-full">
                            Tìm kiếm
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

FlightForm.propTypes = {
    className: PropTypes.string
}

export default FlightForm
