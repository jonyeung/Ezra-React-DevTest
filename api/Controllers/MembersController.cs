﻿using System;
using System.Collections.Generic;

using EzraTest.DB;
using EzraTest.Models;

using Microsoft.AspNetCore.Mvc;

namespace EzraTest.Controllers
{
    [ApiController]
    [Route("members")]
    public class MembersController : ControllerBase
    {
        private readonly IMembersRepository _membersRepository;

        public MembersController()
        {
            _membersRepository = new MembersRepository("app.db");
        }

        [HttpGet]
        [Route("")]
        public IEnumerable<Member> GetAllMembers()
        {
            return _membersRepository.GetMembers();
        }

        [HttpGet]
        [Route("{id}")]
        public Member GetMember(Guid id)
        {
            return _membersRepository.GetMember(id);
        }

        // TODO
        // Add an endpoint to add members
        [HttpPost]
        [Route("/add/{name}/{email}")]
        public void AddMember(string name, string email)
        {
            Member newMember = new Member
            {
                Id = Guid.NewGuid(),
                Name = name,
                Email = email
            };
            
            _membersRepository.AddMember(newMember);
        }

        // TODO
        // Add an endpoint to update a member

        // TODO
        // Add an endpoint to delete a member
        [HttpPost]
        [Route("/delete/{id}")]
        public void DeleteMember(Guid id)
        {
            _membersRepository.DeleteMember(id);
        }
    }
}
