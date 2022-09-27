<template>
  <div>
    <h3>คุณสมบัติ/ทักษะ</h3>
  <form @submit.prevent="submitForm" @reset.prevent="resetForm" method="post">
    <div class="row">
      <div class="input-field col s4">
        <label for="qualification-id">QA-ID/รหัสคุณสมบัติ:</label>
        <!-- <input type="text" v-model="qualification.qualificationId" /> -->
        <input
          type="text"
          name="qualification-id"
          v-model="qualification.qualificationId"
          placeholder="QA-ID/รหัสคุณสมบัติ"
          required  disabled
          class="form-control form-control-lg"
        />
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <label for="planCareer-id">PC-ID/รหัสแผนอาชีพ:</label>
        <!-- <input type="text" v-model="qualification.planCareerId" /> -->
        <input
          type="text"
          name="Name_Plan_Career"
          v-model="qualification.planCareerId"
          placeholder="Career/อาชีพ"
          required  disabled
          class="form-control form-control-lg"
        />
        <select
          :size="4"
          v-model="qualification.planCareerId"
          :required="true"
          @change="getQualification()"
        >
          <option value="" disabled selected>อาชีพที่ต้องการ:</option>
          <option
            v-for="career in careers"
            :value="career.Plan_Career_id"
            :key="career.index"
          >
            {{ career.Plan_Career_id }} {{ career.Name_Plan_Career }}
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <label for="skill">Qualification/คุณสมบัติ:</label>
        <!-- <input type="text" v-model="qualification.skill" /> -->
        <input
          type="text"
          name="skill"
          v-model="qualification.skill"
          placeholder="คุณสมบัติที่กำหนด"
          class="form-control form-control-lg"
        />
        <select :size="4" v-model="qualification.skill">
          <option value="" disabled selected>คุณสมบัติที่กำหนด:</option>
          <option
            v-for="career_qualification in career_qualifications"
            :value="career_qualification.skill"
            :key="career_qualification.index"
          >
            {{ career_qualification.career_qualification_id }}
            {{ career_qualification.qualification }}
            {{ career_qualification.level }}
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <label for="level">Level/ระดับ:</label>
        <!-- <input type="text" v-model="qualification.level" /> -->
        <input
          type="text"
          name="level"
          v-model="qualification.level"
          placeholder="Level/ระดับ"
          class="form-control form-control-lg"
        />
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <div class="form-group">
          <input type="radio" value="Must have" v-model="qualification.level" />
          <label for="qualification_level">Must have</label>
        </div>
      </div>
      <div class="input-field col s4">
        <div class="form-group">
          <input
            type="radio"
            value="Nice to have"
            v-model="qualification.level"
          />
          <label for="qualification_level">Nice to have</label>
        </div>
      </div>
      <div class="input-field col s4">
        <div class="form-group">
          <input type="radio" value="Optional" v-model="qualification.level" />
          <label for="qualification_level">Optional</label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <label for="goal">Goal/เป้าหมาย:</label>
        <!-- <input type="text" v-model="qualification.goal" /> -->
        <input
          type="text"
          name="goal"
          v-model="qualification.goal"
          placeholder="Goal/เป้าหมาย"
          class="form-control form-control-lg"
        />
        <div class="row">
          <div class="input-field col s4">
            <div class="form-group">
              <input type="radio" value="Yes" v-model="qualification.goal" />
              <label for="qualification_goal">Yes</label>
            </div>
          </div>
          <div class="input-field col s4">
            <div class="form-group">
              <input type="radio" value="No" v-model="qualification.goal" />
              <label for="qualification_goal">No</label>
            </div>
          </div>
        </div>
        <select
          :size="4"
          v-model="qualification.goal"
          :required="true"
          @change="getLevel()"
        >
          <option value="" disabled selected>กำหนดเป้าหมาย:</option>
          <option value="1">ระดับ 1/รู้จักทักษะนี้เล็กน้อย</option>
          <option value="2">ระดับ 2/เคยเรียนทักษะนี้มาบ้าง</option>
          <option value="3">ระดับ 3/เคยใช้ทักษะนี้เป็นครั้งคราว</option>
          <option value="4">ระดับ 4/ได้ใช้ทักษะนี้ประจําหรือในงาน</option>
          <option value="5">
            ระดับ 5/ปัจจุบันสามารถสอนทักษะนี้แก่ผู้อื่นได้
          </option>
        </select>
      </div>
    </div>
    <div class="form-contol">
      <input type="submit" value="Save/บันทึก" class="btn btn-success" />
      <input type="reset" value="Cancel/ยกเลิก" class="btn btn-danger" />
    </div>
  </form>
  <!-- <div class="py-2">
    {{ qualifications_ }}
  </div>
  <div class="py-2">
    {{ qualification }}
  </div> -->
  <!-- <div class="py-2">employee_id:{{ employee_id }} careers:{{ careers }}</div>
  <div class="py-2">career_qualifications: {{ career_qualifications }}</div> -->
  <div class="py-2">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">QA-ID</th>
          <th scope="col">PC-ID</th>
          <th scope="col">Qualification/Skill</th>
          <th scope="col">Level</th>
          <th scope="col">Goal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in qualifications" :key="row.index">
          <td>{{ row.qualificationId }}</td>
          <td>{{ row.planCareerId }}</td>
          <td>{{ row.skill }}</td>
          <td>{{ row.level }}</td>
          <td>{{ row.goal }}</td>
          <td>
            <button
              class="btn btn-primary"
              @click="editUser(row.qualificationId)"
            >
              Edit
            </button>
          </td>
          <td>
            <button
              class="btn btn-warning"
              @click="deleteUser(row.qualificationId)"
            >
              Delete
            </button>
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FormQualification",
  components: {},
  data() {
    return {
      message: "Form Qualification",
      selected: "",
      qualifications: Array,
      qualifications_: Array,
      employee_id: this.$store.getters.myMember_id,
      careerPath: "",
      careers: Array,
      career_qualifications: Array,
      qualification: {
        qualificationId: "",
        planCareerId: "",
        skill: "",
        level: "",
        goal: "",
        // month: "มกราคม",
        // self_assessment: "Yes",
        isVisible: false,
      },
      isEdit: false,
      status: "บันทึก",
    };
  },
  methods: {
    resetForm() {
      this.status = "บันทึก";
      this.isEdit = false;
      console.log("ยกเลิกการบันทึกข้อมูล");
      // this.qualification.qualificationId = 0;
      // this.qualification.planCareerId = 0;
      this.qualification.skill = "";
      this.qualification.level = "";
      this.qualification.goal = "";
      // this.qualification.month = "";
      // this.qualification.self_assessment = "";
      this.qualification.isVisible = false;
    },
    getAllUser() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api-qualification.php", {
          action: "getall",
        })
        .then(function (res) {
          console.log(res);
          self.qualifications = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getCareer() {
      console.log(" ข้อมูลอาชีพ ");
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api-career-qualification.php", {
          action: "getEmpCareer",
          employee_id: this.employee_id,
        })
        .then(function (res) {
          self.careers = res.data;
          console.log("careers:", self.careers);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getQualification() {
      console.log(" แสดงข้อมูลคุณสมบัติ ");
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api-career-qualification.php", {
          action: "getCareerQualifiation",
          career_id: this.qualification.planCareerId,
        })
        .then(function (res) {
          console.log(res);
          self.career_qualifications = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getLevel() {
      console.log(" แสดงข้อมูลระดับ ");
    },
    submitForm() {
      if (!this.isEdit) {
        console.log("บันทึกข้อมูล");
        console.log("qualification:", this.qualification);
        const newQualification = {
          qualificationId: this.qualification.qualificationId,
          planCareerId: this.qualification.planCareerId,
          skill: this.qualification.skill,
          level: this.qualification.level,
          goal: this.qualification.goal,
          // month: this.qualification.month,
          // result: this.qualification.self_assessment,
          isVisible: this.qualification.isVisible,
        };
        this.$emit("saveData", newQualification);

        axios
          .post("http://localhost/ICPScoreCard/api-qualification.php", {
            action: "insert",
            qualificationId: this.qualification.qualificationId,
            planCareerId: this.qualification.planCareerId,
            skill: this.qualification.skill,
            level: this.qualification.level,
            goal: this.qualification.goal,
            // month: this.qualification.month,
            // result: this.qualification.self_assessment,
          })
          .then((res) => {
            console.log(res);
            this.resetForm();
            this.getAllUser();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios
          .post("http://localhost/ICPScoreCard/api-qualification.php", {
            action: "update",
            qualificationId: this.qualification.qualificationId,
            planCareerId: this.qualification.planCareerId,
            skill: this.qualification.skill,
            level: this.qualification.level,
            goal: this.qualification.goal,
            // month: this.qualification.month,
            // result: this.qualification.self_assessment,
          })
          .then((response) => {
            console.log(response);
            this.resetForm();
            this.getAllUser();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    editUser(qualificationId) {
      this.status = "Update(อัพเดท)";
      this.isEdit = true;
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api-qualification.php", {
          action: "edit",
          qualificationId: qualificationId,
        })
        .then(function (response) {
          console.log(response);
          self.qualification.qualificationId = response.data.qualificationId;
          self.qualification.planCareerId = response.data.planCareerId;
          self.qualification.skill = response.data.skill;
          self.qualification.level = response.data.level;
          self.qualification.goal = response.data.goal;
          // self.qualification.month = response.data.month;
          // self.qualification.self_assessment = response.data.self_assessment;
          self.qualifications_ = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteUser(qualificationId) {
      if (confirm("คุณต้องการลบรหัส " + qualificationId + " หรือไม่ ?")) {
        var self = this;
        axios
          .post("http://localhost/ICPScoreCard/api-qualification.php", {
            action: "delete",
            qualificationId: qualificationId,
          })
          .then(function (response) {
            console.log(response);
            self.resetForm();
            self.getAllUser();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
  created() {
    this.getAllUser();
    this.getCareer();
  },
};
</script>

<style scoped>
h3 {
  color: #2f855a;
}
form {
  margin: 2rem auto;
  max-width: 100%;
  /* border-radius: 12px; */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  color: white;
  text-align: left;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  color: #2f855a;
  font-weight: bold;
}

input,
select {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
}
button {
  font: inherit;
  cursor: pointer;
  /* background: gray;
  color: white; */
  padding: 0.05rem 1rem;
  border-radius: 15px;
}
input[type="radio"] {
  display: inline-block;
  width: auto;
  margin-right: 1rem;
}
input[type="radio"] + label {
  font-weight: normal;
}
</style>