Task Manager – Full-Stack DevOps Project

A production-ready Task Manager Backend built using Flask, MySQL, Docker, and GitHub Actions CI/CD, deployed on AWS EC2.
This project demonstrates backend development, containerization, CI/CD automation, and cloud deployment best practices.

 Project Overview

This project is a secure REST API backend for a task management application.
It supports user authentication using JWT, database integration with MySQL, containerized deployment using Docker, and automated build & test pipelines via GitHub Actions.

The project is designed following real-world DevOps and backend engineering standards.

 Tech Stack
Backend

Python

Flask

Flask-JWT-Extended

Flask-CORS

Werkzeug Security

Database

MySQL 8.0

DevOps & Cloud

Docker

Docker Compose

GitHub Actions (CI/CD)

AWS EC2 (Linux, t3.micro)

 Key Features

 JWT-based authentication

 User registration & login

 Secure password hashing

 Health check endpoint for CI/CD

 Dockerized backend

 CI pipeline with GitHub Actions

 Deployed on AWS EC2

 Retry-safe MySQL connection handling

 Project Architecture
fullstack-devops-project/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── Dockerfile
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── docker-compose.yml
└── README.md

 CI/CD Workflow

The project uses GitHub Actions to automate:

Code checkout

Docker image build

Container startup

Health check validation (/health endpoint)

CI Trigger

On push to main

On pull request to main
