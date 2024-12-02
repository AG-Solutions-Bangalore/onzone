// add received previous code 
  // const CheckBarcode = async (e, index) => {
  //   const workId = workorder.work_order_rc_id;
  //   const barcodeId = e.target.value;
  //   if (barcodeId.length === 6) {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get(
  //       `${BASE_URL}/api/fetch-work-order-finish-check/${workId}/${barcodeId}`,

  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (response?.data?.code == "200") {
  //       if (workorder.work_order_rc_pcs <= work_order_count) {
  //         toast.info("Maximum pieces reached");
  //       } else {
  //         setUsers([
  //           ...users,
  //           { work_order_rc_sub_barcode: "", work_order_rc_sub_box: "" },
  //         ]);
  //         setCount(work_order_count + 1);
  //         toast.success("Barcode Found");
  //         const nextIndex = index + 1;
  //         if (inputRefs.current[nextIndex]) {
  //           inputRefs.current[nextIndex].focus();
  //         }
  //       }
  //     } else {
  //       toast.error("Barcode Not Found");
  //     }
  //   }
  //   console.log("Checking barcode:", e.target.value, "at index:", index);
  // };