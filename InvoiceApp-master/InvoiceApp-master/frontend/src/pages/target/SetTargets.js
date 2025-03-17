import React from "react";
import { TopicBar } from "../../componants/TopicBar";

import CallReceivedOutlinedIcon from "@mui/icons-material/CallReceivedOutlined";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";

export const SetTargets = () => {
  return (
    <div>
      <TopicBar text="Set Targets" />
      <div className="row set-target-wrapper d-flex w-100 justify-content-between p-5 bg-light">
        <div className="col-6 target-form-wrapper p-3">
          <div className="target-form d-flex flex-column justify-content-center">
            <h3>Set Individual Targets</h3>
            <form className="d-flex flex-column justify-content-center">
              <div className="d-flex gap-3 align-items-center m-4">
                <label for="">Select Operator</label>
                <select
                  class="form-select form-select-lg "
                  aria-label="Large select example"
                >
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="d-flex gap-3 align-items-center m-4">
                <label for="">Operation</label>
                <input
                  class="form-control"
                  type="text"
                  placeholder="ex : Pocket"
                  aria-label="default input example"
                />
              </div>
              <div className="d-flex gap-3 align-items-center m-4">
                <label for="">Time for 1 operation</label>
                <div class="input-group">
                  <input
                    class="form-control"
                    type="number"
                    placeholder="ex : 5"
                    aria-label="default input example"
                  />
                  <button class="btn btn-outline-secondary" type="button">
                    <CallReceivedOutlinedIcon sx={{ color: "#007EA4" }} />
                    Calculate
                  </button>
                </div>
              </div>
              <div className="d-flex gap-3 align-items-center m-4">
                <label for="">Operations for 1hr</label>
                <input
                  class="form-control"
                  type="number"
                  aria-label="default input example"
                />
              </div>
              <button type="button" class="btn btn-primary btn-lg">
                <ArrowOutwardOutlinedIcon />
                Set Target
              </button>
            </form>
          </div>
        </div>
        <div className="col-6 target-display table-striped p-4">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
