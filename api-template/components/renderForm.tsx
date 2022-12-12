import React from "react";
import Form from "./util/components/Form";

export default function renderForm({ components = [] }: any) {
  return <Form components={components} />;
}
