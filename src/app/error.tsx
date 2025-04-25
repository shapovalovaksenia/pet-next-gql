"use client";

import { useEffect } from "react";
import { Button, Result } from "antd";
import MainLayout from "@/components/layout/MainLayout";
import { GlobalErrorProps } from "@/interfaces";

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Unhandled Application Error:", error);
  }, [error]);

  return (
    <MainLayout>
      <Result
        status="error"
        title="Something Went Wrong"
        subTitle={`An unexpected error occurred: ${error.message}. Please try again.`}
        extra={
          <Button type="primary" onClick={() => reset()}>
            Try Again
          </Button>
        }
      />
    </MainLayout>
  );
}
