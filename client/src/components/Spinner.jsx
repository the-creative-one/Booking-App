import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
const Spinner = () => (
  <Spin
    indicator={
      <LoadingOutlined
        style={{
          fontSize: 44,
          color: "rgb(139 92 246)",
          marginTop: 200,
        }}
        spin
      />
    }
  />
);
export default Spinner;
