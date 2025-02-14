"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
// import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import { useUser } from "@clerk/nextjs";
// import Image from "next/image";

interface FeedbackProps {
  isOpen: boolean;
  onClose: () => void;
}

const Feedback: React.FC<FeedbackProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    views: "",
    stars: 0,
  });

  const { user } = useUser();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Form submitted!", { autoClose: 2000 });

    const newFeedback = {
      _id: Date.now().toString(),
      name: `${formData.firstname} ${formData.lastname}` || user?.fullName || "Anonymous",
      comment: formData.views,
      stars: formData.stars,
      image: user?.imageUrl || "/user.png",
    };

    const storedFeedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
    localStorage.setItem("feedbacks", JSON.stringify([...storedFeedbacks, newFeedback]));

    setFormData({ firstname: "", lastname: "", views: "", stars: 0 });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleStarChange = (rating: number) => {
    setFormData((prevData) => ({ ...prevData, stars: rating }));
  };

  return (
    <>
      <div className="fixed inset-0 bg-white/[0.8] dark:bg-black/[0.8] backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-xl w-full mx-auto rounded-md p-6 shadow-xl bg-white dark:bg-black border border-blue-500 z-50">
        <h2 className="font-bold text-4xl">Feedback</h2>
        <p className="text-blue-400 text-sm mt-2">Your feedback helps us improve!</p>
        <button onClick={onClose} className="absolute top-4 right-4">✕</button>

        <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <Label htmlFor="firstname" className="text-black dark:text-white"> First Name</Label>
            <Input id="firstname" placeholder="John" className="bg-white dark:bg-black text-black dark:text-white"  type="text" value={formData.firstname} onChange={handleChange} />
            <Label htmlFor="lastname" className="text-black dark:text-white"> Last Name</Label>
            <Input id="lastname" placeholder="Doe" className="bg-white dark:bg-black text-black dark:text-white"  type="text" value={formData.lastname} onChange={handleChange} />
          </div>
          <Label className="text-black dark:text-white" htmlFor="views">Your Feedback</Label>
          <Input id="views" placeholder="Your thoughts..." className="bg-white dark:bg-black text-black dark:text-white"  type="text" value={formData.views} onChange={handleChange} />

          <Label className="text-black dark:text-white">Rate Experience : </Label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => handleStarChange(star)} className={`text-xl ${formData.stars >= star ? "text-yellow-500" : "opacity-30"}`}>★</button>
            ))}
          </div>

          <button className="bg-blue-600 hover:bg-green-600 text-white w-full rounded-md h-10 mt-6" type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Feedback;