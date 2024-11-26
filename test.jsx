import React, { useEffect, useRef } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = ({ onDetected }) => {
  const scannerRef = useRef(null);

  useEffect(() => {
    // Quagga configuration
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment" // Use back camera on mobile devices
          },
        },
        locator: {
          patchSize: "medium",
          halfSample: true
        },
        numOfWorkers: 2,
        decoder: {
          readers: [
            "ean_reader",
            "ean_8_reader",
            "code_128_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "upc_reader",
            "upc_e_reader"
          ]
        },
        locate: true
      },
      function(err) {
        if (err) {
          console.error("Error initializing Quagga:", err);
          return;
        }
        Quagga.start();
      }
    );

    // Listener for successful barcode detection
    Quagga.onDetected((result) => {
      onDetected(result.codeResult.code);
    });

    // Cleanup
    return () => {
      Quagga.stop();
    };
  }, [onDetected]);

  return (
    <div 
      ref={scannerRef} 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '300px' 
      }}
    />
  );
};

export default BarcodeScanner;














import React, { useState } from 'react';
import BarcodeScanner from './BarcodeScanner';
import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";

const AddOrderReceived = () => {
  const [showmodal, setShowmodal] = useState(false);

  const handleBarcodeScan = (scannedValue) => {
    console.log("Barcode scanned:", scannedValue);
    
    // Similar logic to previous implementation
    const newUsers = [...users];
    const emptyIndex = newUsers.findIndex(user => user.work_order_rc_sub_barcode === "");
    
    if (emptyIndex !== -1) {
      newUsers[emptyIndex].work_order_rc_sub_barcode = scannedValue;
      setUsers(newUsers);
      
      // Trigger barcode check
      const syntheticEvent = {
        target: { 
          value: scannedValue, 
          name: 'work_order_rc_sub_barcode' 
        }
      };
      
      onChange(syntheticEvent, emptyIndex);
      CheckBarcode(syntheticEvent, emptyIndex);
    } else {
      // Add new field if no empty exists
      const newUserEntry = { work_order_rc_sub_barcode: scannedValue };
      setUsers([...newUsers, newUserEntry]);
      setCount(work_order_count + 1);
    }

    // Close modal after scanning
    setShowmodal(false);
  };

  return (
    <Layout>
      {/* Your existing code */}
      
      <Dialog open={showmodal} handler={() => setShowmodal(false)} size="lg">
        <DialogBody className="h-[60vh] md:h-[75vh] lg:h-[85vh] p-4 flex justify-center">
          <BarcodeScanner onDetected={handleBarcodeScan} />
        </DialogBody>
        <DialogFooter>
          <button 
            onClick={() => setShowmodal(false)}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Close
          </button>
        </DialogFooter>
      </Dialog>
    </Layout>
  );
};

export default AddOrderReceived;