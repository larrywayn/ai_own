import { Button, Form } from "antd";
import { useEffect, useState } from "react";

function SubmitButton({ handleClick, form }) {
  const values = Form.useWatch([], form);
  const [submittable, setSubmittable] = useState(false);
  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  return (
    <Button
      onClick={handleClick}
      type="primary"
      htmlType="submit"
      disabled={!submittable}
    >
      Submit
    </Button>
  );
}

export default SubmitButton;
