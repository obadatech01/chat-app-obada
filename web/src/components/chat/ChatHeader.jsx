import Auth from "Auth";
import Avatar from "components/Avatar";
import moment from "moment";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Row,
  UncontrolledDropdown,
} from "reactstrap";

const ChatHeader = (props) => {
  const logout = () => {
    Auth.logout();
    window.location.href = "/login";
  };

  const status = () => {
    if(props.typing) return 'يكتب الآن';
    if(props.contact.status === true) return 'متصل الآن';
    if(props.contact.status) return moment(props.contact.status).fromNow();
  }

  return (
    <Row className="heading m-0 justify-content-sm-between flex-nowrap">
      <div className="w-auto d-flex align align-items-center">
				<Avatar src={props.contact.avatar} />
				<div className="text-right p-3">
					<div>{props.contact ? props.contact.name : ''}</div>
          <small>{status()}</small>
				</div>
			</div>
      <Nav className="mr-auto w-auto" navbar >
				<UncontrolledDropdown>
					<DropdownToggle tag="a" className="nav-link">
						<i className="fa fa-ellipsis-v" />
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem onClick={logout}>تسجيل الخروج</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
			</Nav>
    </Row>
  )
}

export default ChatHeader;