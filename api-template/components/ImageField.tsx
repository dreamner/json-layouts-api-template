import { Box, Divider, Paper } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";

export interface IImageFied {
  desc: string;
  value: string;
  handleChange: Function;
  multiple?:boolean
}

export default function ImageField({ desc, value, handleChange , multiple=false}: IImageFied) {
  const [image, setImage] = React.useState<string>("");

  const onDrop = React.useCallback((acceptedFiles: any) => {
    handleChange(acceptedFiles);
  }, [handleChange]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: multiple? 100: 1,
  });
  const { ref, ...rootProps } = getRootProps();

  useEffect(() => {
    if (value) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImage((e as any).target.result as any);
      };
      try {
        reader.readAsDataURL(value as any);
      } catch (e) {
        console.log(e);
      }
    }
  }, [value]);

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        bgcolor: "background.newWhite",
      }}
      {...rootProps}
    >
      <Box>
        {Boolean(image) && (
          <Box>
            <img height={144} src={image} alt="Uploaded Image" />
            <Divider />
          </Box>
        )}
        <input {...getInputProps()} />
        <p>{isDragActive ? "Drop files here" : desc}</p>
      </Box>
    </Paper>
  );
}
