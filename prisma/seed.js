import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});



async function main() {
  await prisma.doctor.createMany({
    data: [
      {
        name: "Dr. Priya Sharma",
        specialty: "General Physician",
        experience: 12,
        fee: 500,
        location: "Koramangala, Bangalore",
        available: true,
        qualifications: "MBBS, MD General Medicine",
        about: "Experienced physician specializing in preventive care and chronic disease management."
      },
      {
        name: "Dr. Arjun Mehta",
        specialty: "Cardiologist",
        experience: 18,
        fee: 1000,
        location: "Indiranagar, Bangalore",
        available: true,
        qualifications: "MBBS, MD, DM Cardiology",
        about: "Expert in heart diseases, hypertension and cardiac diagnostics."
      },
      {
        name: "Dr. Neha Reddy",
        specialty: "Dermatologist",
        experience: 10,
        fee: 700,
        location: "Whitefield, Bangalore",
        available: true,
        qualifications: "MBBS, MD Dermatology",
        about: "Specializes in skin disorders, acne treatment and cosmetic dermatology."
      },
      {
        name: "Dr. Rahul Verma",
        specialty: "Orthopedist",
        experience: 15,
        fee: 900,
        location: "HSR Layout, Bangalore",
        available: true,
        qualifications: "MBBS, MS Orthopedics",
        about: "Expert in sports injuries and joint replacement surgeries."
      },
      {
        name: "Dr. Sneha Iyer",
        specialty: "Gynecologist",
        experience: 14,
        fee: 800,
        location: "Jayanagar, Bangalore",
        available: true,
        qualifications: "MBBS, MD Obstetrics & Gynecology",
        about: "Experienced in pregnancy care and women's health."
      },
      {
        name: "Dr. Vikram Rao",
        specialty: "Pediatrician",
        experience: 11,
        fee: 650,
        location: "Marathahalli, Bangalore",
        available: true,
        qualifications: "MBBS, MD Pediatrics",
        about: "Specialist in child healthcare and vaccinations."
      },
      {
        name: "Dr. Kiran Nair",
        specialty: "Psychiatrist",
        experience: 13,
        fee: 850,
        location: "Electronic City, Bangalore",
        available: true,
        qualifications: "MBBS, MD Psychiatry",
        about: "Treats anxiety, depression and stress disorders."
      },
      {
        name: "Dr. Meera Joshi",
        specialty: "Dentist",
        experience: 9,
        fee: 600,
        location: "BTM Layout, Bangalore",
        available: true,
        qualifications: "BDS, MDS",
        about: "Specializes in cosmetic and restorative dentistry."
      },
      {
        name: "Dr. Anand Kulkarni",
        specialty: "Neurologist",
        experience: 20,
        fee: 1200,
        location: "Malleshwaram, Bangalore",
        available: true,
        qualifications: "MBBS, DM Neurology",
        about: "Expert in neurological disorders and stroke management."
      },
      {
        name: "Dr. Kavya Menon",
        specialty: "ENT Specialist",
        experience: 10,
        fee: 700,
        location: "Rajajinagar, Bangalore",
        available: true,
        qualifications: "MBBS, MS ENT",
        about: "Specialist in ear, nose and throat disorders."
      },
      {
        name: "Dr. Rohan Bhat",
        specialty: "General Physician",
        experience: 8,
        fee: 450,
        location: "Yelahanka, Bangalore",
        available: false,
        qualifications: "MBBS, MD",
        about: "Focuses on lifestyle diseases and preventive care."
      },
      {
        name: "Dr. Nisha Kapoor",
        specialty: "Dermatologist",
        experience: 7,
        fee: 650,
        location: "Bellandur, Bangalore",
        available: true,
        qualifications: "MBBS, MD Dermatology",
        about: "Experienced in hair loss and pigmentation treatments."
      },
      {
        name: "Dr. Sandeep Rao",
        specialty: "Cardiologist",
        experience: 16,
        fee: 1100,
        location: "Hebbal, Bangalore",
        available: true,
        qualifications: "MBBS, DM Cardiology",
        about: "Specializes in interventional cardiology."
      },
      {
        name: "Dr. Pooja Shetty",
        specialty: "Gynecologist",
        experience: 9,
        fee: 750,
        location: "Banashankari, Bangalore",
        available: true,
        qualifications: "MBBS, DGO",
        about: "Provides women's wellness and fertility consultation."
      },
      {
        name: "Dr. Aditya Singh",
        specialty: "Orthopedist",
        experience: 13,
        fee: 850,
        location: "JP Nagar, Bangalore",
        available: false,
        qualifications: "MBBS, MS Orthopedics",
        about: "Expert in spine and trauma surgery."
      },
      {
        name: "Dr. Ritu Malhotra",
        specialty: "Pediatrician",
        experience: 12,
        fee: 700,
        location: "Sarjapur Road, Bangalore",
        available: true,
        qualifications: "MBBS, MD Pediatrics",
        about: "Specialist in newborn care and pediatric nutrition."
      },
      {
        name: "Dr. Akash Patel",
        specialty: "Dentist",
        experience: 11,
        fee: 650,
        location: "Basavanagudi, Bangalore",
        available: true,
        qualifications: "BDS, MDS Orthodontics",
        about: "Specializes in braces and smile correction."
      },
      {
        name: "Dr. Shreya Desai",
        specialty: "Psychiatrist",
        experience: 8,
        fee: 800,
        location: "MG Road, Bangalore",
        available: true,
        qualifications: "MBBS, MD Psychiatry",
        about: "Works extensively with young adults and stress management."
      },
      {
        name: "Dr. Vivek Menon",
        specialty: "Neurologist",
        experience: 17,
        fee: 1250,
        location: "Ulsoor, Bangalore",
        available: true,
        qualifications: "MBBS, DM Neurology",
        about: "Experienced in epilepsy and movement disorders."
      },
      {
        name: "Dr. Anjali Prabhu",
        specialty: "ENT Specialist",
        experience: 9,
        fee: 650,
        location: "Kengeri, Bangalore",
        available: true,
        qualifications: "MBBS, MS ENT",
        about: "Treats sinus, allergy and hearing disorders."
      }
    ],
    skipDuplicates: true,
  });

  console.log("Doctors seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });