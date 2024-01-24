import { Card, Form } from "antd";
import SubmitButton from "./SubmitButton";

function FormHolder({ handleClick, children }) {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      initialValues={{ remember: true }}
      name="validateOnly"
      autoComplete="off"
    >
      <Card
        actions={[
          // @ts-ignore
          <SubmitButton handleClick={handleClick} form={form}>
            Generiere Audio
          </SubmitButton>,
        ]}
      >
        {children}
      </Card>
    </Form>
  );
}

export default FormHolder;
