import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  CircularProgress,
  Select,
} from "@mui/material";
import { usePagesStateValue } from "../lib/builder";
import AddPageDialog from "./AddPageDialog";
import { GetServerSideProps } from "next";
import React from "react";
import prisma from "../lib/prisma";

export default function ToggleButtons({ app }) {
  const pages = usePagesStateValue("pages");
  const pageIndex = usePagesStateValue("pageIndex");
  const { changePage } = useActions();

  const [saving, setSaving] = React.useState(false);

  async function updateApp(id: string, payload): Promise<any> {
    return await fetch(`/api/app/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  const handleSave = async (e) => {
    try {
      setSaving(true);
      const res = await updateApp(app.id, {
        ...app,
        draft: JSON.stringify(pages),
      });
      if (res) {
        setSaving(false);
      } else {
        setSaving(false);
      }
    } catch (e) {
      setSaving(false);
      console.log(e);
    }
  };

  return (
    <Box sx={{ mb: 3, display: "flex" }}>
      <Box sx={{ width: 200 }}>
        <AddPageDialog />
      </Box>
      <Box sx={{ width: 180, ml: 2 }}>
        <FormControl size="small" fullWidth>
          <InputLabel id="demo-simple-select-label">Select page</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={pageIndex}
            label="Select page"
            onChange={(e) => changePage(parseInt(e.target.value))}
          >
            {pages.map((page, index) => {
              return (
                <MenuItem key={index} value={index}>
                  {index + 1} {page.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <Box sx={{ width: 200, ml: 2 }}>
          <Button
            size="small"
            disabled={saving}
            onClick={handleSave}
            disableElevation
            variant="contained"
          >
            {saving ? <CircularProgress /> : "Save Changes"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

function useActions() {
  const dispatch = usePagesStateValue("dispatch");

  return {
    changePage(index: number) {
      const type = "update_all";
      const payload = index;
      const key = "pageIndex";
      dispatch({ type, key, payload });
    },
  };
}
