import Auth from "../Auth";
import Logo2 from "../assets/03.jpg";
import Logo from "../assets/logo-me.png";
import axios from "axios";
import { Error, notify } from "../components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Button, Card, Form, Input } from "reactstrap";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !username || !email || !password || !confirmPassword) {
      setError("املأ جميع الحقول!");
    }

    if (password !== confirmPassword) {
      setError("كلمة المرور غير متطابقة!");
    }

    const formData = { name, username, email, password, confirmPassword };
    axios
      .post("/api/v1/auth/signup", formData)
      .then((res) => {
        Auth.login(res.data);
        window.location.href = "/";
      })
      .catch((err) => {
        // console.log(err.response.data.errors);
        err.response?.data.errors.map(err => notify(err.msg, "error"))
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
          <h5 className="mb-4">إنشاء حساب جديد</h5>
          { error && <Error id="error" error={error} />}
          <Input
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="الاسم"
            // required
            autoFocus
          />
          <Input
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="اسم المستخدم"
            // required
          />
          <Input
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="البريد الإلكتروني"
            // required
          />
          <Input
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة المرور"
            // required
          />
          <Input
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="تأكيد كلمة المرور"
            // required
          />
          <Button color="primary" type="submit" block className="mb-3">
            {" "}
            إنشاء{" "}
          </Button>
          <small>
            <Link to="/login">تسجيل الدخول</Link>
          </small>
          <p className="m-3 text-muted">obadatech01&copy; {new Date().getFullYear()}</p>
        </Form>
      </Card>
    </>
  );
};

export default Register;
