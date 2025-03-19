import { faPlaneArrival, faPlaneDeparture, faUser } from "@fortawesome/free-solid-svg-icons";
import SelectInput from "../../../components/SelectInput/SelectInput";
import flightJson from "../../../data/mocks/Flight/flight.json";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../components/Button";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";

import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fields = ["Người lớn", "Trẻ em", "Em bé"];

const FlightForm = ({ className }) => {
    const [departure, setDeparture] = useState(dayjs());
    const [arrival, setArrival] = useState(dayjs());

    const [departureLocation, setDepartureLocation] = useState("");
    const [arrivalLocation, setArrivalLocation] = useState("");

    const [values, setValues] = useState({ adults: 0, children: 0, infants: 0 });

    const handleChange = (event, field) => {
        let newValue = Math.max(0, Math.min(50, Number(event.target.value) || 0));
        setValues((prev) => ({ ...prev, [field]: newValue }));
    };

    const [isRoundTrip, setIsRoundTrip] = useState(false);
    const handleTripTypeChange = (event) => {
        setIsRoundTrip(event.target.value === "roundTrip");
    };

    const handleSearch = () => {
        if (!departureLocation) {
            toast.error("Vui lòng chọn điểm đi!", { position: "bottom-right" });
            return;
        }

        if (!arrivalLocation) {
            toast.error("Vui lòng chọn điểm đến!", { position: "bottom-right" });
            return;
        }

        if (departureLocation === arrivalLocation) {
            toast.error("Điểm đi và điểm đến không thể trùng nhau!", { position: "bottom-right" });
            return;
        }

        if (departure.isBefore(dayjs(), "day")) {
            toast.error("Ngày đi không được nhỏ hơn ngày hiện tại!", { position: "bottom-right" });
            return;
        }

        if (isRoundTrip && arrival.isBefore(departure, "day")) {
            toast.error("Ngày về phải sau ngày đi!", { position: "bottom-right" });
            return;
        }

        if (values.adults < 1) {
            toast.error("Phải có ít nhất một người lớn!", { position: "bottom-right" });
            return;
        }

        toast.success("Form hợp lệ, tiến hành tìm kiếm...", { position: "bottom-right" });
    };

    return (
        <div className={`py-10 px-6 bg-white items-center shadow-md border border-gray-300 rounded-4xl lg:space-y-10 space-y-0 ${className}`}>
            <div className="text-center space-y-3 text-gray-900">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Mở cánh cửa khám phá cùng TourX</h2>
                <p className="text-[18px] font-light">TourX - Đặt chân lên đỉnh mây với một bước nhảy</p>
            </div>
            <div className="space-y-3">
                <div className="flex justify-between items-center space-x-3">
                    <FormControl>
                        <RadioGroup value={isRoundTrip ? "roundTrip" : "oneWay"} onChange={handleTripTypeChange} row>
                            <FormControlLabel value="oneWay" control={<Radio />} label="Một chiều" />
                            <FormControlLabel value="roundTrip" control={<Radio />} label="Khứ hồi" />
                        </RadioGroup>
                    </FormControl>
                    <FormGroup row>
                        <FormControlLabel control={<Checkbox />} label="Vé rẻ nhất tháng" />
                    </FormGroup>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Điểm đi */}
                    <SelectInput
                        destination="Điểm đi"
                        placeholder="Vui lòng nhập điểm đi"
                        icon={faPlaneDeparture}
                        data={flightJson}
                        onChange={(value) => setDepartureLocation(value)}
                    />

                    <SelectInput
                        destination="Điểm đến"
                        placeholder="Vui lòng nhập điểm đến"
                        icon={faPlaneArrival}
                        data={flightJson}
                        onChange={(value) => setArrivalLocation(value)}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]} className="w-full">
                            <DatePicker label="Ngày đi" value={departure} onChange={(newValue) => setDeparture(newValue)} minDate={dayjs()} format="DD/MM/YYYY" />
                        </DemoContainer>
                    </LocalizationProvider>
                    {isRoundTrip && (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker"]} className="w-full">
                                <DatePicker label="Ngày về" value={arrival} onChange={(newValue) => setArrival(newValue)} minDate={departure} format="DD/MM/YYYY" />
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
                        <Button primary rounded className="h-[58px] w-full" onClick={handleSearch}>
                            Tìm kiếm
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

FlightForm.propTypes = {
    className: PropTypes.string,
};

export default FlightForm;