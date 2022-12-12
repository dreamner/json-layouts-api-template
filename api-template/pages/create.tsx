// pages/create.tsx

import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import ImageField from "../components/ImageField";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import useUpload from "../hooks/useUpload";

const Draft: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("Other");

  const [saving, setSaving] = useState(false);

  const uploadFiles = useUpload();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSaving(true);
    const uploads = await uploadFiles([{ fileData: image, field: "image" }]);

    const images = (uploads as unknown as any).reduce((p, c) => {
      return { ...p, [c.field]: c.url };
    }, {});
    let currentState = { name, description, type };

    if (Boolean(images)) {
      currentState = { ...currentState, ...images };
    }
    try {
      const body = { ...currentState };
      const res = await fetch("/api/app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res) setSaving(false);
      await Router.push("/drafts");
    } catch (error) {
      setSaving(false);
    }
  };

  const handleLogoChange = React.useCallback(
    (data) => {
      setImage(data[0]);
    },
    [image]
  );

  return (
    <Layout>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1 }}></Box>
        <form onSubmit={submitData}>
          <Stack spacing={2}>
            <h1>New App</h1>
            <TextField
              autoFocus
              onChange={(e) => setName(e.target.value)}
              placeholder="App name"
              type="text"
              value={name}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Type of application
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Type of application"
                onChange={(e) => setType(e.target.value as string)}
              >
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              multiline
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short description for your app"
              rows={8}
              value={description}
            />
            <Box>
              <ImageField
                value={image}
                handleChange={handleLogoChange}
                desc="Drag and drop or pick an image for your app icon / favicon"
              />
            </Box>

            <Button
              variant="outlined"
              disabled={!name || !description || !image || saving}
              type="submit"
            >
              { saving?  "Creating app..." : "Create app"}
            </Button>
            <a className="back" href="#" onClick={() => Router.push("/")}>
              or Cancel
            </a>
          </Stack>
        </form>
      </Box>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
