import { Form, Input } from "antd";
import { useState } from "react";

export function useRequiredInput({ id, name, type, description, placeholder }) {
  const [value, setValue] = useState("");
  const input = (
    <Form.Item name={id} label={name} rules={[{ required: true }]}>
      <Input
        onChange={(e) => setValue(e.target.value)}
        defaultValue={value}
        placeholder={placeholder}
      />
    </Form.Item>
  );
  return [value, input];
}
