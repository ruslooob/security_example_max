import React, {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@mui/icons-material";


interface Props {
    id: string,
    label: string,
    onChange: Dispatch<SetStateAction<string>>
}

export const PasswordField: React.FC<Props> = ({id, label, onChange}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <TextField
            id={id}
            label={label}
            type={showPassword ? 'text' : 'password'}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                        >
                            {showPassword ? <Visibility fontSize="small"/> : <VisibilityOff fontSize="small"/>}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    )
}
