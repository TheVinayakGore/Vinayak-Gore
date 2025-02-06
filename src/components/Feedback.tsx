"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface FeedbackProps {
  isOpen: boolean;
  onClose: () => void;
}

const Feedback: React.FC<FeedbackProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    views: "",
    stars: 0, // New state for star rating
  });

  const { data: session } = useSession();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Form submitted!", { autoClose: 2000 });

    // Create a new feedback object
    const newFeedback = {
      _id: Date.now().toString(), // Unique ID based on timestamp
      name: `${formData.firstname} ${formData.lastname}`,
      comment: formData.views,
      stars: formData.stars, // Include stars in feedback
    };

    // Get existing feedbacks from local storage
    const storedFeedbacks = JSON.parse(
      localStorage.getItem("feedbacks") || "[]"
    );

    // Add the new feedback to the array
    const updatedFeedbacks = [...storedFeedbacks, newFeedback];

    // Save updated feedbacks array to local storage
    localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks));

    // Clear form
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      views: "",
      stars: 0, // Reset stars
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleStarChange = (rating: number) => {
    setFormData((prevData) => ({
      ...prevData,
      stars: rating,
    }));
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/[0.8] backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-2xl shadow-blue-600/[0.4] bg-black/[0.8] backdrop-blur-sm border border-blue-500/[0.7] z-50">
        <h2 className="font-bold text-5xl text-zinc-200">Welcome</h2>
        <p className="text-blue-500 opacity-70 text-sm mt-2">
          Submit feedback with your views about my portfolio, feedback will
          visible below author info.
        </p>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 px-2 border border-zinc-800 hover:border-zinc-400 rounded text-zinc-700 hover:text-zinc-200 focus:outline-none"
          aria-label="Close modal"
        >
          ✕
        </button>

        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer className="space-y-4">
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                placeholder="Jethalal"
                type="text"
                value={formData.firstname}
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer className="space-y-4">
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastname"
                placeholder="Gada"
                type="text"
                value={formData.lastname}
                onChange={handleChange}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="my-8 space-y-4">
            <Label htmlFor="views">Your views on site</Label>
            <div className="flex items-center space-x-2">
              {session?.user?.image && (
                <Image
                  src={session?.user?.image}
                  width={40}
                  height={40}
                  alt="User Profile Image"
                  className="rounded-full"
                />
              )}
              <Input
                id="views"
                placeholder="Hee maa, mataji... !"
                type="text"
                value={formData.views}
                onChange={handleChange}
              />
            </div>
          </LabelInputContainer>

          <Label className="my-4">Rate site experience :</Label>
          <div className="flex space-x-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleStarChange(star)}
                className={`text-xl ${formData.stars >= star ? "text-yellow-500" : "text-zinc-600"}`}
              >
                ★
              </button>
            ))}
          </div>

          <button
            className="bg-gradient-to-br relative group/btn from-blue-500 to-blue-800 hover:from-green-500 hover:to-green-800 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Submit
            <BottomGradient />
          </button>
        </form>
      </div>
    </>
  );
};

export default Feedback;

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
