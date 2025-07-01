import { Autocomplete, TextField } from "@mui/material";

type Props<T> = {
  options: T[];
  label?: string;
  value: T | null;
  handleChange: (event: any, newValue: T | null) => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  mobilefontsize?: string;
  desktopfontsize?: string;
  showLabel?: boolean;
  showBorder?: boolean;
  showClearIcon?: boolean;
  showPopupIcon?: boolean;
  outlinedInputPadding?: string;
  inputPadding?: string;
  textAlign?: string;
  showBold?: boolean; // <-- add this
  placeholder?:string
};

const AutoComplete = <T extends { id: string | number; title: string }>({
  options,
  label,
  value,
  handleChange,
  setSearch,
  mobilefontsize = "0.7rem",
  desktopfontsize = "0.875rem",
  showLabel = true,
  showBorder = true,
  showClearIcon = true,
  showPopupIcon = true,
  outlinedInputPadding = "10px",
  textAlign,
  inputPadding,
  showBold = false, // <-- default to false
  placeholder=""
}: Props<T>) => {
  return (
    <Autocomplete     
      options={options}
      clearIcon={showClearIcon ? undefined : <span />}
      popupIcon={showPopupIcon ? undefined : <span />}
      renderOption={(props, option) => (
        <li
          {...props}
          className="text-xs md:text-sm p-2"
          style={{
            textAlign: (textAlign !== undefined ? textAlign : "right") as
              | "left"
              | "center"
              | "right",
          }}
          key={option.id}
        >
          {option.title}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          label={showLabel ? label : undefined}
          onChange={(event) => setSearch(event.target.value)}
          sx={{
            fontSize: { xs: mobilefontsize, sm: desktopfontsize },
            fontWeight: showBold ? 700 : 400, // <-- root font weight
            "& .MuiInputBase-input": {
              fontSize: { xs: mobilefontsize, sm: desktopfontsize },
              fontWeight: showBold ? 700 : 400, // <-- input font weight
              ...(inputPadding && { padding: inputPadding }),
              textAlign: (textAlign as "left" | "center" | "right") ?? "left",
            },
            "& .MuiInputLabel-root": {
              fontSize: { xs: mobilefontsize, sm: desktopfontsize },
              fontWeight: showBold ? 700 : 400, // <-- label font weight
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: showBorder ? undefined : "none",
            },
            "& .MuiAutocomplete-popupIndicator": {
              display: showPopupIcon ? undefined : "none",
            },
            "& MuiOutlinedInput-notchedOutline": {
              textAlign: (textAlign as "left" | "center" | "right") ?? "left",
            },
            "& .MuiInputBase-root": {
              textAlign: (textAlign as "left" | "center" | "right") ?? "left",
            },
            "& .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon.muirtl-1tlcqt-MuiAutocomplete-root .MuiOutlinedInput-root":
              {
                paddingLeft: textAlign === "center" ? 0 : undefined,
                paddingRight: textAlign === "center" ? 0 : undefined,
              },
            ".muirtl-2jdxdn-MuiFormControl-root-MuiTextField-root .MuiOutlinedInput-root":
              {
                paddingY: outlinedInputPadding,
              },
            ...(outlinedInputPadding && {
              "& .MuiOutlinedInput-root": {
                paddingY: outlinedInputPadding,
                paddingX: textAlign === "center" ? 0 : outlinedInputPadding,
              },
            }),
          }}
        />
      )}
      value={value}
      onChange={handleChange}
      getOptionLabel={(option) => option.title || ""}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      noOptionsText="پیدا نشد"
      className="w-full"
    />
  );
};

export default AutoComplete;
