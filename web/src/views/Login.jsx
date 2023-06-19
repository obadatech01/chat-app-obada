import Auth from "../Auth";
import Logo2 from "../assets/03.jpg";
import Logo from "../assets/logo-me.png";
import axios from "axios";
import { Error, notify } from "../components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Button, Card, Form, Input } from "reactstrap";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!user || !password) {
      setError("الرجاء التحقق من اسم المستخدم وكلمة المرور!");
    }

    const formData = { user, password };
    axios
      .post("/api/v1/auth/login", formData)
      .then((res) => {
        Auth.login(res.data);
        window.location.href = "/";
      })
      .catch((err) => {
        // console.log(err.response.data.errors);
        notify("هناك خطأ في اسم المستخدم أو كلمة السر", "error")
        // err.response?.data.errors.map((err) => notify(err.msg, "error"));
      });
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      <Card className="auth col-lg-3 col-sm-6 p-3">
        <ToastContainer autoClose={2000} />
        <Form onSubmit={onSubmit}>
          <img src={Logo} alt="" width="200" />
          <img
            src={Logo2}
            alt=""
            style={{ borderRadius: "50%", width: "50px" }}
          />
          <h5 className="mb-4">تسجيل الدخول</h5>
          {error && <Error id="error" error={error} />}
          <Input
            value={user}
            name="user"
            onChange={(e) => setUser(e.target.value)}
            placeholder="اسم المستخدم أو البريد الإلكتروني"
            // required
            autoFocus
          />
          <Input
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة المرور"
            // required
          />
          <Button color="primary" type="submit" block className="mb-3">
            {" "}
            دخول{" "}
          </Button>
          <small>
            <Link to="/register">انشاء حساب جديد</Link>
          </small>
          <p className="m-3 text-muted">
            obadatech01&copy; {new Date().getFullYear()}
          </p>
        </Form>
      </Card>
    </>
  );
};

export default Login;
