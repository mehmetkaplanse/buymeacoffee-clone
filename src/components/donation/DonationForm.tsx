"use client";
import { Donation } from "@/app/models/Donation";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const DonationForm = ({email}: {email: string}) => {
  const [numberInValue, setNumberInValue] = useState("1");
  const [crypto, setCrypto] = useState("btc");
  const [amount, setAmount] = useState<number>(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      amount: amount,
      name: '',
      message: '',
      crypto: crypto,
      email: email
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await axios.post('/api/donate', data)
      if (response) {
        toast.success('Thank you for your donation!')
        const result = await response.data.json();
      } else {
        console.error('Failed to submit donation');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };
  

  useEffect(() => {
    if (!numberInValue || numberInValue === "0") {
      setAmount(1);
    } else {
      const intValue = parseInt(numberInValue);
      setAmount(intValue);
    }
  }, [numberInValue]);
  return (
    <>
      <div className="border border-yellow-300 bg-yellow-300/10 rounded-xl p-4 flex items-center gap-2">
        <FontAwesomeIcon icon={faCoffee} />
        <span>x</span>
        <button
          type="button"
          onClick={() => {
            setAmount(1);
            setNumberInValue("1");
          }}
          className={"donationBtn " + (amount === 1 ? "active" : "")}
        >
          1
        </button>
        <button
          type="button"
          onClick={() => {
            setAmount(3);
            setNumberInValue("3");
          }}
          className={"donationBtn " + (amount === 3 ? "active" : "")}
        >
          3
        </button>
        <button
          type="button"
          onClick={() => {
            setAmount(5);
            setNumberInValue("5");
          }}
          className={"donationBtn " + (amount === 5 ? "active" : "")}
        >
          5
        </button>
        <input
          className="w-12 h-12 border rounded-xl text-center border-yellow-300"
          type="number"
          placeholder="10"
          onChange={(e) => setNumberInValue(e.target.value)}
          value={numberInValue}
        />
      </div>
      <div className="mt-2">
        <input type="text"  placeholder="Your name" {...register('name')} />
      </div>
      <div className="mt-2">
        <textarea {...register('message')} name="message" id="" placeholder="Say something nice"></textarea>
      </div>
      <div className="mt-2">
        <h3 className="text-xs mb-1 text-gray-500">
          Pay with selected crypto or with cc
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCrypto("btc")}
            className={`cryptoBtn ${crypto === "btc" ? "active" : ""}`}
          >
            <span>BTC</span>
            <p>Bitcoin</p>
          </button>
          <button
            onClick={() => setCrypto("eth")}
            className={`cryptoBtn ${crypto === "eth" ? "active" : ""}`}
          >
            <span>ETH</span>
            <p>Ethereum</p>
          </button>
          <button
            onClick={() => setCrypto("ltc")}
            className={`cryptoBtn ${crypto === "ltc" ? "active" : ""}`}
          >
            <span>LTC</span>
            <p>Litecoin</p>
          </button>
        </div>
      </div>

      <div className="mt-2">
        <button 
          onClick={handleSubmit(onSubmit)}
          type="submit"
          className="bg-yellow-300 w-full rounded-xl py-2">
          Support ${amount * 5}
        </button>
      </div>
    </>
  );
};

export default DonationForm;
