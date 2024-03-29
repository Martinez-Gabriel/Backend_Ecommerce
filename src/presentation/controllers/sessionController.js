import UserManager from "../../domain/managers/userManager.js";
import { createHash, generateToken, isValidPassword } from "../../shared/sessionShared.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      throw new Error("Email and Password invalid format.");
    }

    const manager = new UserManager();
    const user = await manager.getOneByEmail(email);
    const isHashedPassword = await isValidPassword(password, user.password);

    if (!isHashedPassword) {
      return res
        .status(401)
        .send({ message: "Login failed, invalid password." });
    }

    const accessToken = await generateToken(user);

    res.status(200).send({ accessToken, message: "Login success!" });
  } catch (e) {
    next(e);
  }
};

export const current = async (req, res, next) => {
  try {
    {
      res.status(200).send({ status: "Success", payload: req.user });
    }
  } catch (e) {
    next(e);
  }
};

export const signup = async (req, res, next) => {
  try {
    const manager = new UserManager();

    const dto = {
      ...req.body,
      password: await createHash(req.body.password, 10),
    };

    const user = await manager.create(dto);

    res.status(201).send({ status: "success", user, message: "User created." });
  } catch (e) {
    next(e);
  }
};

export const logout = async (req, res, next) => {
  try{
    req.session.destroy(err => {
      if (err) {
        return res.json({ status: 'Logout ERROR', body: err })
      }
    res.send('Logout OK!')
    })
  } catch (e) {
    next(e);
  }
}
