import React, {FC, useState} from "react";
import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Noop} from "react-hook-form";


interface Props {
    label: string,
    error: boolean,
    helperText: string | undefined,
    inputRef: any,
    field: { onChange: (...event: any[]) => void, onBlur: Noop, value: string, name: string }
}

export const PasswordField: FC<Props> = ({label, error, helperText, inputRef, field}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <TextField
            label={label}
            type={showPassword ? 'text' : 'password'}
            error={error}
            helperText={helperText}
            {...field}
            inputRef={inputRef}
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
