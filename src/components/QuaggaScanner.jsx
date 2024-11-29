import { Quagga } from 'quagga';
import React, { useEffect, useRef } from 'react'

const QuaggaScanner = ({ onDetected }) => {
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
}

export default QuaggaScanner