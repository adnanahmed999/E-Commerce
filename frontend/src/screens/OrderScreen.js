import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder } from "../actions/orderAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

// Code for GPAY
// Code for GPAY
// Code for GPAY
// Code for GPAY
// Code for GPAY

const { googlePayClient } = window;

const baseCardPaymentMethod = {
  type: "CARD",
  parameters: {
    allowedCardNetworks: ["VISA", "MASTERCARD"],
    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
  },
};

const googlePayBaseConfiguration = {
  apiVersion: 2,
  apiVersionMinor: 0,
  allowedPaymentMethods: [baseCardPaymentMethod],
};

// Code for GPAY
// Code for GPAY
// Code for GPAY
// Code for GPAY
// Code for GPAY

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const dispatch = useDispatch();

  // Code for GPAY
  // Code for GPAY
  // Code for GPAY
  // Code for GPAY
  // Code for GPAY

  const [gPayBtn, setGPayBtn] = useState(null);

  function createAndAddButton() {
    if (googlePayClient) {
      const googlePayButton = googlePayClient.createButton({
        buttonColor: "default",

        buttonType: "long",

        onClick: processPayment,
      });

      setGPayBtn(googlePayButton);
    }
  }

  function processPayment() {
    console.log("test");
    const tokenizationSpecification = {
      type: "PAYMENT_GATEWAY",
      parameters: {
        gateway: "stripe",
        "stripe:version": "v3",
        "stripe:publishableKey": "pk_test_35p114pH8oNuHX72SmrvsFqh00Azv3ZaIA",
      },
    };

    const cardPaymentMethod = {
      type: "CARD",
      tokenizationSpecification: tokenizationSpecification,
      parameters: {
        allowedCardNetworks: ["VISA", "MASTERCARD"],
        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
        billingAddressRequired: true,
        billingAddressParameters: {
          format: "FULL",
          phoneNumberRequired: true,
        },
      },
    };

    const transactionInfo = {
      totalPriceStatus: "FINAL",
      totalPrice: "0", 
      // only for demo purpose, other wise we can enter price from detailsOrder store
      currencyCode: "USD",
    };

    const merchantInfo = {
      merchantName: "Example Merchant Name",
    };

    const paymentDataRequest = {
      ...googlePayBaseConfiguration,
      ...{
        allowedPaymentMethods: [cardPaymentMethod],
        transactionInfo,
        merchantInfo,
      },
    };

    googlePayClient
      .loadPaymentData(paymentDataRequest)
      .then(function (paymentData) {
        console.log(paymentData);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  useEffect(() => {
    googlePayClient
      .isReadyToPay(googlePayBaseConfiguration)
      .then(function (response) {
        if (response.result) {
          createAndAddButton();
        } else {
          alert("Unable to pay using Google Pay");
        }
      })
      .catch(function (err) {
        console.error("Error determining readiness to use Google Pay: ", err);
      });
  }, []);

  // Code for GPAY
  // Code for GPAY
  // Code for GPAY
  // Code for GPAY
  // Code for GPAY

  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {!gPayBtn ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <button
                      className="block"
                      onClick={processPayment}
                      dangerouslySetInnerHTML={{
                        __html: gPayBtn && gPayBtn.innerHTML,
                      }}
                    ></button>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
