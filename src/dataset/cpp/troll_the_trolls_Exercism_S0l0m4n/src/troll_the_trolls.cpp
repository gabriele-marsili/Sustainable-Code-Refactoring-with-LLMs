namespace hellmath {

// Task 1 - Define an `AccountStatus` enumeration to represent the four
// account types: `troll`, `guest`, `user`, and `mod`.
enum class AccountStatus {
    troll,
    guest,
    user,
    mod,
};

// Task 1 - Define an `Action` enumeration to represent the three
// permission types: `read`, `write`, and `remove`.
enum class Action {
    read,
    write,
    remove,
};

// Task 2 - Implement the `display_post` function, that gets two arguments
// of `AccountStatus` and returns a `bool`. The first argument is the status of
// the poster, the second one is the status of the viewer.
bool display_post(AccountStatus s1, AccountStatus s2) {
    bool ret = false;
    if (s1 == AccountStatus::troll)
        ret = (s2 == AccountStatus::troll);
    else
        ret = (s2 != AccountStatus::troll);
    return ret;
}

// Task 3 - Implement the `permission_check` function, that takes an
// `Action` as a first argument and an `AccountStatus` to check against. It
// should return a `bool`.
bool permission_check(Action action, AccountStatus status) {
    bool ret = false;
    switch (action) {
        case Action::read:
            // Everyone can read
            ret = true;
            break;

        case Action::write:
            // Only guests cannot write
            if (status != AccountStatus::guest)
                ret = true;
            break;

        case Action::remove:
            // Only moderators can read
            if (status == AccountStatus::mod)
                ret = true;
            break;

        default:
            break;
    }
    return ret;
}

// Task 4 - Implement the `valid_player_combination` function that
// checks if two players can join the same game. The function has two parameters
// of type `AccountStatus` and returns a `bool`.
bool valid_player_combination(AccountStatus s1, AccountStatus s2) {
    bool ret = true;
    if ((s1 == AccountStatus::guest) || (s2 == AccountStatus::guest))
        ret = false;
    else if ((s1 == AccountStatus::troll) ^ (s2 == AccountStatus::troll))
        ret = false;
    return ret;
}

// Task 5 - Implement the `has_priority` function that takes two
// `AccountStatus` arguments and returns `true`, if and only if the first
// account has a strictly higher priority than the second.
bool has_priority(AccountStatus s1, AccountStatus s2) {
    return static_cast<int>(s1) > static_cast<int>(s2);
}

}  // namespace hellmath
