import React from "react";

import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationList({ count, page, handleChange }) {
  return (
    <div className="w-full-screen text-slate-100 flex justify-center">
      <Stack spacing={4} color="primary">
        <Typography></Typography>
        <Pagination
          size="large"
          count={count}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
}
