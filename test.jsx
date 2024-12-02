{!workOrder.customer_address && (
    <>
      <p><strong>Address:</strong> {workOrder.customer_address}</p>
      <p>
        {!workOrder.customer_mobile && `Mobile: ${workOrder.customer_mobile}`}
        {!workOrder.customer_email && ` | Email: ${workOrder.customer_email}`}
      </p>
    </>
  )}